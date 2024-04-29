package pack_hotel;

import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.FileContent;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.auth.http.HttpCredentialsAdapter;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.model.File;
import com.google.api.services.drive.model.Permission;

import jakarta.enterprise.context.ApplicationScoped;
import java.io.FileInputStream;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@ApplicationScoped
public class GoogleDriveService {

    private static final String APPLICATION_NAME = "Google Drive API Java Quickstart";
    private static Drive driveService = null;

    private static synchronized Drive getDriveService() throws IOException, GeneralSecurityException {
        if (driveService == null) {
            GoogleCredentials credentials = GoogleCredentials.fromStream(new FileInputStream("/home/pmorales/Downloads/horizontal-ring-362713-21d3b463b3e1.json"))
                    .createScoped(Collections.singleton("https://www.googleapis.com/auth/drive.file"));
            JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();

            driveService = new Drive.Builder(GoogleNetHttpTransport.newTrustedTransport(), JSON_FACTORY, new HttpCredentialsAdapter(credentials))
                    .setApplicationName(APPLICATION_NAME)
                    .build();
        }
        return driveService;
    }

    public String uploadFile(String filePath, String fileName, String mimeType, String folderId) throws IOException, GeneralSecurityException {
        File fileMetadata = new File();
        fileMetadata.setName(fileName);
        fileMetadata.setParents(Collections.singletonList(folderId)); // Set the parent folder

        java.io.File file = new java.io.File(filePath);
        FileContent mediaContent = new FileContent(mimeType, file);

        File gFile = getDriveService().files().create(fileMetadata, mediaContent)
            .setFields("id, webViewLink")
            .execute();

        return gFile.getWebViewLink();
    }

    public void addPermission(String fileId, String type, String role) throws IOException, GeneralSecurityException {
        Permission newPermission = new Permission();
        newPermission.setType(type);
        newPermission.setRole(role);

        getDriveService().permissions().create(fileId, newPermission).execute();
    }
    
    public void handleFileUpload(String filePath, String fileName, String mimeType, String folderId) {
        try {
            String fileLink = uploadFile(filePath, fileName, mimeType, folderId);
            String fileId = extractFileIdFromLink(fileLink);
            addPermission(fileId, "anyone", "reader");
            System.out.println("File uploaded and permission set: " + fileLink);
        } catch (IOException | GeneralSecurityException e) {
            e.printStackTrace();
            System.out.println("Failed to upload file or set permissions: " + e.getMessage());
        }
    }

    private String extractFileIdFromLink(String fileLink) {
        Matcher matcher = Pattern.compile("/d/(.*?)/view").matcher(fileLink);
        if (matcher.find()) {
            return matcher.group(1);
        }
        throw new IllegalArgumentException("Cannot extract file ID from link");
    }
}
