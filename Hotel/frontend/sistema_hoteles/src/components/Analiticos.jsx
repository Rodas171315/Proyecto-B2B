import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table, Pagination, InputGroup, FormControl } from 'react-bootstrap';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement } from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import emailjs from 'emailjs-com';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
);

const Analiticos = () => {
    const [barChartData, setBarChartData] = useState({});
    const [lineChartData, setLineChartData] = useState({});
    const [pieChartData, setPieChartData] = useState({});

    // paginacion

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(25);


    const [searchResults, setSearchResults] = useState([]);
    const [filters, setFilters] = useState({ fechaDesde: '', fechaHasta: '', tipoAcceso: '', esAutenticado: '' });


    useEffect(() => {
        const fetchGraphData = async () => {
            await fetchBusquedasPorPais();
            await fetchEvolucionBusquedas();
            await fetchTipoAcceso();
        };
    
        fetchGraphData();
    }, []); // Assuming no dependencies
    

    const fetchBusquedasPorPais = async () => {
        const response = await axios.get('http://localhost:8080/analiticos/registros/paises');
        const paises = response.data;
        const labels = Object.keys(paises);
        const data = labels.map(pais => paises[pais]);
        setBarChartData({
            labels,
            datasets: [{
                label: 'Número de búsquedas por país',
                data,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }],
        });
    };

    const fetchEvolucionBusquedas = async () => {
        const response = await axios.get('http://localhost:8080/analiticos/registros/evolucion');
        const evolucion = response.data;
        const labels = Object.keys(evolucion);
        const data = labels.map(fecha => evolucion[fecha]);
        setLineChartData({
            labels,
            datasets: [{
                label: 'Búsquedas a lo largo del tiempo',
                data,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            }],
        });
    };

    const fetchTipoAcceso = async () => {
        const response = await axios.get('http://localhost:8080/analiticos/registros/tipoacceso');
        const tipoAcceso = response.data;
        const labels = Object.keys(tipoAcceso);
        const data = labels.map(type => tipoAcceso[type]);
        setPieChartData({
            labels,
            datasets: [{
                label: 'Distribución del Tipo de Acceso',
                data,
                backgroundColor: ['rgba(255, 205, 86, 0.7)', 'rgba(54, 162, 235, 0.7)'],
                hoverOffset: 4
            }],
        });
    };

    const handleFilterChange = e => {
        const { name, value, type, checked } = e.target;
        // Use the checkbox value if it's the 'esAutenticado' filter
        setFilters({ ...filters, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSearch = async () => {
        const esAutenticadoValue = filters.esAutenticado ? 'true' : 'false'; 

        const offset = new Date().getTimezoneOffset() * 60000;
        const formattedFromDate = filters.fechaDesde ? (new Date(new Date(filters.fechaDesde).getTime() - offset)).toISOString() : '';
        const formattedToDate = filters.fechaHasta ? (new Date(new Date(filters.fechaHasta).getTime() - offset)).toISOString() : '';
    
        console.log(`Searching from ${formattedFromDate} to ${formattedToDate}`);
        const params = new URLSearchParams({
            fechaDesde: formattedFromDate,
            fechaHasta: formattedToDate,
            tipoAcceso: filters.tipoAcceso,
        });
    
        // Add the esAutenticado parameter conditionally based on the checkbox
        if (filters.esAutenticado !== '') {
            params.append('esAutenticado', esAutenticadoValue);
        }
    
        try {
            const response = await axios.get(`http://localhost:8080/analiticos/filtrar?${params}`);
            const formattedResults = response.data.map(item => ({
                ...item,
                fechaHora: new Date(item.fechaHora).toLocaleString('en-US', {
                    year: 'numeric', month: 'numeric', day: 'numeric',
                    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
                })
            }));
            setSearchResults(formattedResults);
            setCurrentPage(1);
        } catch (error) {
            console.error('Error fetching search results:', error);
            setSearchResults([]);
        }
    };
    

    // PAGINEO
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = searchResults.slice(indexOfFirstRecord, indexOfLastRecord);
    
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    



// CORREO
const [file, setFile] = useState(null);
const [email, setEmail] = useState(''); // correo
const [driveLink, setDriveLink] = useState(''); // Enlace de Google Drive


const handleLinkChange = (event) => {
    setDriveLink(event.target.value);
};

const convertToCSV = (data) => {
    if (!data || data.length === 0) {
        console.error('No data available to convert to CSV');
        return ''; // Return an empty string or handle this case as needed
    }
    const replacer = (key, value) => value === null ? '' : value;
    const header = Object.keys(data[0]);
    let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    return csv.join('\r\n');
};


const toBase64 = (csvData) => {
    return btoa(unescape(encodeURIComponent(csvData)));
};


const downloadCSV = (csvData) => {
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'download.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};

const handleDownload = () => {
    if (!currentRecords || currentRecords.length === 0) {
        console.error('No records to download');
        return; // Optionally alert the user or handle this scenario appropriately.
    }
    const csvData = convertToCSV(currentRecords);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'searchResults.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    console.log("CSV file has been downloaded.");
};




const sendEmail = () => {
    if (!driveLink) {
        console.error("No Google Drive link provided");
        alert("Please enter a Google Drive link before sending the email.");
        return;
    }

    const templateParams = {
        to_email: email,
        drive_link: driveLink, // Enviando solo el enlace de Google Drive
    };

    emailjs.send('service_db-dw2', 'template_rq1e8jw', templateParams, '83TAqc_7hHgnfdESC')
        .then((response) => {
            console.log('Email successfully sent!', response.status, response.text);
            alert("Email successfully sent!");
        }, (error) => {
            console.error('Failed to send email:', error);
            alert("Failed to send email. Check the console for more details.");
        });
};







const handleExport = () => {
    const csvData = convertToCSV(currentRecords);
    sendEmail(csvData);
};


const handleUploadToDrive = () => {
    const folderId = '1nihlBuTFBe11gQ5fDxHi0AQ_SWGA7E6x';
    axios.post('http://localhost:8080/uploadToDrive', {
        filePath: '/home/pmorales/Downloads/searchResults.csv',
        fileName: 'searchResults.csv',
        folderId: folderId  
    }).then(response => {
        alert('File successfully uploaded to Google Drive. Link: ' + response.data.fileLink);
    }).catch(error => {
        console.error('Error uploading file:', error);
        alert('Failed to upload file: ' + error.message);
    });
};







   
    return (
        <Container fluid className="analiticos-container">
            <Row>
                <Col md={12}>
                    <Form>
                        <Row>
                            <Col md={3}>
                                <Form.Group controlId="fechaDesde">
                                    <Form.Label>Fecha Desde</Form.Label>
                                    <Form.Control type="datetime-local" name="fechaDesde" value={filters.fechaDesde} onChange={handleFilterChange} />
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group controlId="fechaHasta">
                                    <Form.Label>Fecha Hasta</Form.Label>
                                    <Form.Control type="datetime-local" name="fechaHasta" value={filters.fechaHasta} onChange={handleFilterChange} />
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group controlId="tipoAcceso">
                                    <Form.Label>Tipo de Acceso</Form.Label>
                                    <Form.Control as="select" name="tipoAcceso" value={filters.tipoAcceso} onChange={handleFilterChange}>
                                        <option value="">Seleccione</option>
                                        <option value="web">Web</option>
                                        <option value="REST">REST</option
                                    ></Form.Control>
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group controlId="esAutenticado">
                                    <Form.Check
                                        type="checkbox"
                                        label="Autenticado"
                                        name="esAutenticado"
                                        checked={filters.esAutenticado}
                                        onChange={handleFilterChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={3} className="d-flex align-items-end">
                                <Button onClick={handleSearch}>Buscar</Button>
                            </Col>
                        </Row>
                    </Form>
                    <Table striped bordered hover size="sm" className="mt-4">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Usuario ID</th>
                                <th>Fecha/Hora</th>
                                <th>Detalle de Búsqueda</th>
                                <th>Tipo Acceso</th>
                            </tr>
                        </thead>
                        <tbody>
    {currentRecords.map((item, index) => (
        <tr key={index}>
            <td>{item.id}</td>
            <td>{item.usuarioId || 'No Autenticado'}</td>
            <td>{item.fechaHora}</td>
            <td>{item.parametrosBusqueda}</td>
            <td>{item.tipoAcceso}</td>
        </tr>
    ))}
</tbody>

                    </Table>
                    


                    <Pagination>{Array.from({ length: Math.ceil(searchResults.length / recordsPerPage) }, (_, i) => (
                        <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => paginate(i + 1)}>
                            {i + 1}
                        </Pagination.Item>
                    ))}</Pagination>




                </Col>
            </Row>



            <Row>
                <Col md={12}>
                    <Form>
                        <Button onClick={handleDownload}>Descargar CSV</Button>
                    </Form>


                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Recipient's email"
                            aria-label="Recipient's email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <FormControl
                            placeholder="Enter Google Drive link"
                            value={driveLink}
                            onChange={handleLinkChange}
                        />
                        <Button variant="outline-secondary" onClick={sendEmail}>Enviar Coreeo</Button>
                    </InputGroup>
                </Col>
            </Row>


            <Row>
                <Col md={12}>
                    <Button variant="primary" onClick={handleUploadToDrive}>Subir a la carpeta del Hotel</Button>
                </Col>
            </Row>



            <Row>
                <Col md={12}>
                    <h2 className="chart-title">Análisis de Búsquedas por País</h2>
                    {barChartData.labels && <Bar data={barChartData} options={{ responsive: true }} />}
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <h2 className="chart-title">Evolución de las Búsquedas</h2>
                    {lineChartData.labels && <Line data={lineChartData} options={{ responsive: true, scales: { y: { beginAtZero: true } } }} />}
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <h2 className="chart-title">Distribución del Tipo de Acceso</h2>
                    {pieChartData.labels && <Pie data={pieChartData} options={{ responsive: true }} />}
                </Col>
            </Row>





            
        </Container>
    ); 
};

export default Analiticos;
