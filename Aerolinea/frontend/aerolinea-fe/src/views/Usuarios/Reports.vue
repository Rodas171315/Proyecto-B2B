<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import SelectInput from '@/components/SelectInput.vue';

import jszip from 'jszip';
import pdfmake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import DataTable from 'datatables.net-vue3';
import DataTablesLib from 'datatables.net-bs5';
import Buttons from 'datatables.net-buttons-bs5';
import ColVis from 'datatables.net-buttons/js/buttons.colVis.mjs';
import ButtonsHtml5 from 'datatables.net-buttons/js/buttons.html5.mjs';
import Print from 'datatables.net-buttons/js/buttons.print.mjs';
import DateTime from 'datatables.net-datetime';
import FixedHeader from 'datatables.net-fixedheader-bs5';
import Responsive from 'datatables.net-responsive-bs5';
import SearchBuilder from 'datatables.net-searchbuilder-bs5';
import SearchPanes from 'datatables.net-searchpanes-bs5';
import Select from 'datatables.net-select-bs5';
import language from 'datatables.net-plugins/i18n/es-MX.mjs';

pdfmake.vfs = pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : pdfmake.vfs;
window.JSZip = jszip;

DataTable.use(jszip);
DataTable.use(pdfmake);
DataTable.use(DataTablesLib);
DataTable.use(Buttons);
DataTable.use(ColVis);
DataTable.use(ButtonsHtml5);
DataTable.use(Print);
DataTable.use(FixedHeader);
DataTable.use(Responsive);
DataTable.use(SearchBuilder);
DataTable.use(SearchPanes);
DataTable.use(Select);

const usuarios = ref([]);
const vuelos = ref([]);

const columns1 = ref([]);
const columns2 = ref([]);
const buttons1 = ref([]);
const buttons2 = ref([]);
const report = ref('1');
const types = ref([
    { id: '1', name: 'Usuarios' },
    { id: '2', name: 'Vuelos' },
]);

onMounted(async () => {
    const u = await axios.get(import.meta.env.VITE_BACKEND_URL + '/usuarios');
    usuarios.value = u.data;
    const v = await axios.get(import.meta.env.VITE_BACKEND_URL + '/vuelos');
    vuelos.value = v.data;
});

columns1.value = [
    {
        data: null,
        render: function (data, type, row, meta) {
            return meta.row + 1;
        },
    },
    { data: 'email' },
    { data: 'nombre' },
    { data: 'apellido' },
    { data: 'fecha_nacimiento' },
    { data: 'nacionalidad' },
    { data: 'pasaporte' },
];
columns2.value = [
    {
        data: null,
        render: function (data, type, row, meta) {
            return meta.row + 1;
        },
    },
    { data: 'ciudad_origen' },
    { data: 'ciudad_destino' },
    { data: 'fecha_salida' },
    { data: 'duracion' },
    { data: 'precio' },
    { data: 'asientosTuristaDisponibles' },
    { data: 'asientosEjecutivosDisponibles' },
    { data: 'valuacion' },
];

buttons1.value = [
    {
        title: 'Usuarios',
        extend: 'csvHtml5',
        text: '<i class="fa-solid fa-file-csv"></i> CSV',
        className:
            'inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 focus:bg-green-700 active:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition ease-in-out duration-150',
    },
    {
        title: 'Usuarios',
        extend: 'excelHtml5',
        text: '<i class="fa-solid fa-file-excel"></i> Excel',
        className:
            'inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 focus:bg-green-700 active:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition ease-in-out duration-150',
    },
    {
        title: 'Usuarios',
        extend: 'pdfHtml5',
        text: '<i class="fa-solid fa-file-pdf"></i> PDF',
        className:
            'inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150',
    },
    {
        title: 'Usuarios',
        extend: 'print',
        text: '<i class="fa-solid fa-print"></i> IMPRIMIR',
        className:
            'inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150',
    },
    {
        title: 'Usuarios',
        extend: 'copy',
        text: '<i class="fa-solid fa-copy"></i> COPIAR',
        className:
            'inline-flex items-center px-4 py-2 bg-gray-200 border border-gray-800 rounded-md font-semibold text-xs uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150',
    },
    {
        title: 'Usuarios',
        extend: 'colvis',
        text: '<i class="fa-solid fa-eye-slash"></i> VER',
        className:
            'inline-flex items-center px-4 py-2 bg-gray-200 border border-gray-800 rounded-md font-semibold text-xs uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150',
    },
];

buttons2.value = [
    {
        title: 'Vuelos',
        extend: 'csvHtml5',
        text: '<i class="fa-solid fa-file-csv"></i> CSV',
        className:
            'inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 focus:bg-green-700 active:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition ease-in-out duration-150',
    },
    {
        title: 'Vuelos',
        extend: 'excelHtml5',
        text: '<i class="fa-solid fa-file-excel"></i> Excel',
        className:
            'inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 focus:bg-green-700 active:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition ease-in-out duration-150',
    },
    {
        title: 'Vuelos',
        extend: 'pdfHtml5',
        text: '<i class="fa-solid fa-file-pdf"></i> PDF',
        className:
            'inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150',
    },
    {
        title: 'Vuelos',
        extend: 'print',
        text: '<i class="fa-solid fa-print"></i> IMPRIMIR',
        className:
            'inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150',
    },
    {
        title: 'Vuelos',
        extend: 'copy',
        text: '<i class="fa-solid fa-copy"></i> COPIAR',
        className:
            'inline-flex items-center px-4 py-2 bg-gray-200 border border-gray-800 rounded-md font-semibold text-xs uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150',
    },
    {
        title: 'Vuelos',
        extend: 'colvis',
        text: '<i class="fa-solid fa-eye-slash"></i> VER',
        className:
            'inline-flex items-center px-4 py-2 bg-gray-200 border border-gray-800 rounded-md font-semibold text-xs uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150',
    },
];
</script>
<template>
    <div class="row mb-5">
        <div class="col-md-8 offset-md-2">
            Reporte:
            <SelectInput id="rep" class="mt-1" v-model="report" :options="types"></SelectInput>
        </div>
    </div>
    <div class="row" v-if="report == '1'">
        <div class="col-md-8 offset-md-2">
            <div class="table-responsive">
                <DataTable
                    :data="usuarios"
                    :columns="columns1"
                    class="table table-striped table-bordered"
                    :options="{
                        responsive: true,
                        select: true,
                        layout: {
                            top: 'buttons',
                        },
                        buttons: buttons1,
                        language: {
                            lengthMenu: 'Mostrar _MENU_ entradas',
                            search: 'Buscar:',
                            zeroRecords: 'No hay datos disponibles para mostrar',
                            info: 'Mostrando _START_ a _END_ de _TOTAL_ entradas',
                            infoFiltered: '(Filtrados de _MAX_ registros)',
                            paginate: {
                                first: 'Primero',
                                previous: 'Anterior',
                                next: 'Siguiente',
                                last: 'Último',
                            },
                        },
                    }"
                >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Email</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Fecha de Nacimiento</th>
                            <th>Nacionalidad</th>
                            <th>Pasaporte</th>
                        </tr>
                    </thead>
                </DataTable>
            </div>
        </div>
    </div>
    <div class="row" v-else>
        <div class="col-md-8 offset-md-2">
            <div class="table-responsive">
                <DataTable
                    :data="vuelos"
                    :columns="columns2"
                    class="table table-striped table-bordered"
                    :options="{
                        responsive: true,
                        select: true,
                        layout: {
                            top: 'buttons',
                        },
                        buttons: buttons2,
                        language,
                    }"
                >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Origen</th>
                            <th>Destino</th>
                            <th>Fecha y hora de salida</th>
                            <th>Duracion</th>
                            <th>Precio</th>
                            <th>Asientos Turista Disponibles</th>
                            <th>Asientos Ejecutivos Disponibles</th>
                            <th>Valuacion</th>
                        </tr>
                    </thead>
                </DataTable>
            </div>
        </div>
    </div>
</template>

<style>
@import 'bootstrap';
@import 'datatables.net-bs5';
@import 'datatables.net-buttons-bs5';
@import 'datatables.net-fixedheader-bs5';
@import 'datatables.net-responsive-bs5';
@import 'datatables.net-searchbuilder-bs5';
@import 'datatables.net-searchpanes-bs5';
@import 'datatables.net-select-bs5';
</style>
