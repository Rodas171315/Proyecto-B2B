package pack_hotel;

import jakarta.inject.Inject;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/uploadToDrive")
public class FileUploadResource {

    @Inject
    GoogleDriveService googleDriveService;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response uploadFileToDrive(FileUploadRequest request) {
        if (request == null || request.getFilePath() == null || request.getFilePath().isEmpty() ||
            request.getFileName() == null || request.getFileName().isEmpty()) {
            return Response.status(Response.Status.BAD_REQUEST).entity("File path or file name is missing").build();
        }

        try {
            String folderId = "1nihlBuTFBe11gQ5fDxHi0AQ_SWGA7E6x";  // El ID de la carpeta destino, resolviendo el problema del accessp

            System.out.println("Attempting to upload: " + request.getFilePath() + " with name " + request.getFileName());
            String fileLink = googleDriveService.uploadFile(request.getFilePath(), request.getFileName(), "text/csv", folderId);
            System.out.println("Upload successful, file link: " + fileLink);
            return Response.ok(new FileUploadResponse(fileLink)).build();
        } catch (Exception e) {
            System.err.println("Upload failed: " + e.getMessage());
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Upload failed: " + e.getMessage()).build();
            }
            }

    public static class FileUploadRequest {
        private String filePath;
        private String fileName;

        public String getFilePath() {
            return filePath;
        }

        public void setFilePath(String filePath) {
            this.filePath = filePath;
        }

        public String getFileName() {
            return fileName;
        }

        public void setFileName(String fileName) {
            this.fileName = fileName;
        }
    }

    public static class FileUploadResponse {
        private String fileLink;

        public FileUploadResponse(String fileLink) {
            this.fileLink = fileLink;
        }

        public String getFileLink() {
            return fileLink;
        }
    }
}
