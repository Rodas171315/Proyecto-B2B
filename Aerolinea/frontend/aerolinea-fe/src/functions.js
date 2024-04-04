import { nextTick } from 'vue';
import Swal from 'sweetalert2';
import axios from 'axios';
import moment from 'moment';

export function show_alerta(msj, icon, focus) {
    if (focus !== '') {
        nextTick(() => focus.value.focus());
    }
    Swal.fire({
        title: msj,
        icon: icon,
        buttonsStyling: true,
    });
}

export function confirmation(id, url, redirect) {
    const alert = Swal.mixin({ buttonsStyling: true });
    alert
        .fire({
            title: '¿Seguro de eliminar ' + id + ' ?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: '<i class="fa-solid fa-check"></i> Si, eliminar',
            cancelButtonText: '<i class="fa-solid fa-ban"></i> Cancelar',
        })
        .then((result) => {
            if (result.isConfirmed) {
                sendRequest('DELETE', {}, url, redirect);
            }
        });
}

export async function sendRequest(method, params, url, redirect = '') {
    let res;
    await axios({ method: method, url: url, data: params })
        .then((response) => {
            (res = response.data.status),
                show_alerta(response.data.message, 'success', ''),
                setTimeout(() => (redirect !== '' ? (window.location.href = redirect) : ''), 2000);
        })
        .catch((errors) => {
            let desc = '';
            res = errors.response.data.status;
            errors.response.data.errors.map((e) => {
                desc = desc + ' ' + e;
            });
            show_alerta(desc, 'error', '');
        });
    return res;
}

export function fechaFormateada(fecha) {
    return moment(fecha).add(1, 'days').format('YYYY-MM-DD');
}

export function fechayhoraFormateada(fechayhora, operacion) {
    let res;
    if (operacion == 'create') {
        res = fechayhora + ':00.000Z';
        return res;
    } else {
        if (operacion == 'edit') {
            res = fechayhora.substring(0, fechayhora.length - 1);
            return res;
        } else {
            return moment(fechayhora).add(6, 'hours').format('YYYY-MM-DD H:mm a');
        }
    }
}
