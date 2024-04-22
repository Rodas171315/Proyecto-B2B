import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Analiticos = () => {
    const [barChartData, setBarChartData] = useState({
        labels: [],
        datasets: [
          {
            label: 'Número de búsquedas por país',
            data: [],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }
        ],
      });
      
      useEffect(() => {
        const fetchBusquedasPorPais = async () => {
          try {
            const response = await axios.get('http://localhost:8080/analiticos/registros/paises');
            const data = response.data;
            // La respuesta ya debería ser un objeto con nombres de países como claves y la cantidad de búsquedas como valores
            const chartData = {
              labels: Object.keys(data),
              datasets: [{
                label: 'Número de búsquedas por país',
                data: Object.values(data),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
              }],
            };
            setBarChartData(chartData);
          } catch (error) {
            console.error('Error al cargar los datos de búsquedas por país:', error);
          }
        };
      
        fetchBusquedasPorPais();
      }, []);
      
      

    return (
        <Container fluid>
            <Row>
                <Col md={12}>
                    <h2>Análisis de Búsquedas por País</h2>
                    <Bar data={barChartData} options={{ responsive: true }} />
                </Col>
            </Row>
        </Container>
    );
};

export default Analiticos;
