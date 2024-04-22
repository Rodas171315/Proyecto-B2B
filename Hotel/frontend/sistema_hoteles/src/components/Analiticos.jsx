import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement } from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import axios from 'axios';

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

    useEffect(() => {
        const fetchBusquedasPorPais = async () => {
            try {
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
            } catch (error) {
                console.error('Error al cargar los datos de búsquedas por país:', error);
            }
        };

        const fetchEvolucionBusquedas = async () => {
            try {
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
            } catch (error) {
                console.error('Error al cargar la evolución de búsquedas:', error);
            }
        };

        const fetchTipoAcceso = async () => {
            try {
                const response = await axios.get('http://localhost:8080/analiticos/registros/tipoacceso');
                console.log("Datos recibidos para tipo de acceso:", response.data);  // Añade esta línea para depurar
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
            } catch (error) {
                console.error('Error al cargar los tipos de acceso:', error);
            }
        };
        

        fetchBusquedasPorPais();
        fetchEvolucionBusquedas();
        fetchTipoAcceso();
    }, []);


    return (
        <Container fluid className="analiticos-container">
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
                <Col md={8}>
                    <h2 className="chart-title">Distribución del Tipo de Acceso</h2>
                    {pieChartData.labels && <Pie data={pieChartData} options={{ responsive: true }} />}
                </Col>
            </Row>
        </Container>
    );
};

export default Analiticos;