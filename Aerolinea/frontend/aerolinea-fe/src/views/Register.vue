<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <h1 class="mb-4">Registrarse</h1>
                <form @submit.prevent="register" class="g-3">
                    <div class="mb-3">
                        <input
                            v-model="email"
                            type="email"
                            placeholder="Email"
                            class="form-control"
                            required
                        />
                    </div>
                    <div class="mb-3">
                        <input
                            v-model="password"
                            type="password"
                            placeholder="Contraseña"
                            class="form-control"
                            required
                        />
                    </div>
                    <div class="mb-3">
                        <input
                            v-model="nombre"
                            type="text"
                            placeholder="Nombre"
                            class="form-control"
                            required
                        />
                    </div>
                    <div class="mb-3">
                        <input
                            v-model="apellido"
                            type="text"
                            placeholder="Apellido"
                            class="form-control"
                            required
                        />
                    </div>
                    <div class="mb-3">
                        <input
                            v-model="fecha_nacimiento"
                            type="date"
                            class="form-control"
                            required
                        />
                    </div>
                    <div class="mb-3">
                        <select v-model="nacionalidad" class="form-select" required>
                            <option disabled value="">Seleccione un país</option>
                            <option v-for="country in countries" :key="country" :value="country">
                                {{ country }}
                            </option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <input
                            v-model="pasaporte"
                            type="number"
                            placeholder="Pasaporte"
                            class="form-control"
                            required
                        />
                    </div>
                    <div class="d-grid gap-2">
                        <button type="submit" class="btn btn-primary">Registrar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const countries = ref([
    'Afghanistan',
    'Albania',
    'Algeria',
    'Andorra',
    'Angola',
    'Antigua and Barbuda',
    'Argentina',
    'Armenia',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bhutan',
    'Bolivia',
    'Bosnia and Herzegovina',
    'Botswana',
    'Brazil',
    'Brunei',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    'Cabo Verde',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Central African Republic',
    'Chad',
    'Chile',
    'China',
    'Colombia',
    'Comoros',
    'Congo (Congo-Brazzaville)',
    'Costa Rica',
    'Croatia',
    'Cuba',
    'Cyprus',
    'Czechia (Czech Republic)',
    'Democratic Republic of the Congo',
    'Denmark',
    'Djibouti',
    'Dominica',
    'Dominican Republic',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'Equatorial Guinea',
    'Eritrea',
    'Estonia',
    'Eswatini ',
    'Ethiopia',
    'Fiji',
    'Finland',
    'France',
    'Gabon',
    'Gambia',
    'Georgia',
    'Germany',
    'Ghana',
    'Greece',
    'Grenada',
    'Guatemala',
    'Guinea',
    'Guinea-Bissau',
    'Guyana',
    'Haiti',
    'Holy See',
    'Honduras',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran',
    'Iraq',
    'Ireland',
    'Israel',
    'Italy',
    'Jamaica',
    'Japan',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    'Kuwait',
    'Kyrgyzstan',
    'Laos',
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Madagascar',
    'Malawi',
    'Malaysia',
    'Maldives',
    'Mali',
    'Malta',
    'Marshall Islands',
    'Mauritania',
    'Mauritius',
    'Mexico',
    'Micronesia',
    'Moldova',
    'Monaco',
    'Mongolia',
    'Montenegro',
    'Morocco',
    'Mozambique',
    'Myanmar (formerly Burma)',
    'Namibia',
    'Nauru',
    'Nepal',
    'Netherlands',
    'New Zealand',
    'Nicaragua',
    'Niger',
    'Nigeria',
    'North Korea',
    'North Macedonia (formerly Macedonia)',
    'Norway',
    'Oman',
    'Pakistan',
    'Palau',
    'Palestine State',
    'Panama',
    'Papua New Guinea',
    'Paraguay',
    'Peru',
    'Philippines',
    'Poland',
    'Portugal',
    'Qatar',
    'Romania',
    'Russia',
    'Rwanda',
    'Saint Kitts and Nevis',
    'Saint Lucia',
    'Saint Vincent and the Grenadines',
    'Samoa',
    'San Marino',
    'Sao Tome and Principe',
    'Saudi Arabia',
    'Senegal',
    'Serbia',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Slovakia',
    'Slovenia',
    'Solomon Islands',
    'Somalia',
    'South Africa',
    'South Korea',
    'South Sudan',
    'Spain',
    'Sri Lanka',
    'Sudan',
    'Suriname',
    'Sweden',
    'Switzerland',
    'Syria',
    'Tajikistan',
    'Tanzania',
    'Thailand',
    'Timor-Leste',
    'Togo',
    'Tonga',
    'Trinidad and Tobago',
    'Tunisia',
    'Turkey',
    'Turkmenistan',
    'Tuvalu',
    'Uganda',
    'Ukraine',
    'United Arab Emirates',
    'United Kingdom',
    'United States',
    'Uruguay',
    'Uzbekistan',
    'Vanuatu',
    'Venezuela',
    'Vietnam',
    'Yemen',
    'Zambia',
    'Zimbabwe',
]);
const router = useRouter();

const email = ref('');
const password = ref('');
const nombre = ref('');
const apellido = ref('');
const fecha_nacimiento = ref('');
const nacionalidad = ref('');
const pasaporte = ref('');

const register = async () => {
    const user = {
        email: email.value,
        password: password.value,
        nombre: nombre.value,
        apellido: apellido.value,
        fecha_nacimiento: fecha_nacimiento.value,
        nacionalidad: nacionalidad.value,
        pasaporte: pasaporte.value,
    };

    try {
        await axios.post(import.meta.env.VITE_BACKEND_URL + '/auth/register', user); // Ajusta según la ruta real de tu API
        alert('Registro exitoso. Por favor, inicia sesión.');
        router.push('/login');
    } catch (error) {
        console.error(error);
        alert('Error al registrar. Por favor, intenta nuevamente.');
    }
};
</script>

<style scoped></style>
