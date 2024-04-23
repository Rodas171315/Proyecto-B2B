import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement } from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    const [searchResults, setSearchResults] = useState([]);
    const [filters, setFilters] = useState({ fechaDesde: '', fechaHasta: '', tipoAcceso: '' });

    useEffect(() => {
        fetchGraphData();
    }, []);

    const fetchGraphData = () => {
        fetchBusquedasPorPais();
        fetchEvolucionBusquedas();
        fetchTipoAcceso();
    };

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
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleSearch = async () => {
        // Correcting timezone offset for backend compatibility
        const offset = new Date().getTimezoneOffset() * 60000;
        const formattedFromDate = filters.fechaDesde ? (new Date(new Date(filters.fechaDesde).getTime() - offset)).toISOString() : '';
        const formattedToDate = filters.fechaHasta ? (new Date(new Date(filters.fechaHasta).getTime() - offset)).toISOString() : '';

        console.log(`Searching from ${formattedFromDate} to ${formattedToDate}`);
        const params = new URLSearchParams({
            fechaDesde: formattedFromDate,
            fechaHasta: formattedToDate,
            tipoAcceso: filters.tipoAcceso
        });

        const response = await axios.get(`http://localhost:8080/analiticos/filtrar?${params}`);
        const formattedResults = response.data.map(item => ({
            ...item,
            fechaHora: new Date(item.fechaHora).toLocaleString('en-US', {
                year: 'numeric', month: 'numeric', day: 'numeric',
                hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
            })
        }));
        setSearchResults(formattedResults);
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
                            {searchResults.map((item, index) => (
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
