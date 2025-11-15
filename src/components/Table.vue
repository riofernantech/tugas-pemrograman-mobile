<script setup lang="ts">

import {ref, onMounted} from 'vue';

const data = ref<Cuaca[]>([]);

interface Cuaca {
    waktu: string,
    suhu: number
}

function mapResponse(param: any): void {
    let result: Cuaca[] = [];
    for (let i = 0; i < param.hourly.time.length; i++) {
        result.push({
            waktu: param.hourly.time[i],
            suhu: param.hourly.temperature_2m[i]
        });
    }
    data.value = result;
}

async function fetchData() {
    try {
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=-6.2&longitude=106.8&hourly=temperature_2m');
        const result = await response.json();
        mapResponse(result);
    } catch (error) {
        console.log("error mengambil data");
    }
}

onMounted(() => {
    fetchData();
})


</script>

<template>

  <div class="container">
        <h1>Data Cuaca Jakarta</h1>
        <p class="subtitle">Informasi suhu dan waktu pengukuran</p>

        <div class="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th>Waktu Pengukuran</th>
                        <th>Suhu</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="value in data">
                        <th class="time-cell">{{ value.waktu }}</th>
                        <th class="temp-cell">{{ value.suhu }}</th>
                    </tr>
                </tbody>
                <tbody>
                    
                </tbody>
            </table>
        </div>
  </div>

</template>

<style scoped>

        .container {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            padding: 30px;
            max-width: 800px;
            width: 100%;
        }

        h1 {
            text-align: center;
            color: #2b2b2b;
            margin-bottom: 10px;
            font-size: 2em;
        }

        .subtitle {
            text-align: center;
            color: #666;
            margin-bottom: 30px;
            font-size: 0.9em;
        }

        .table-wrapper {
            overflow-x: auto;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        table {
            width: 100%;
            border-collapse: collapse;
            background: white;
        }

        thead {
            background: #2b2b2b;
            color: white;
        }

        th {
            padding: 15px;
            text-align: left;
            font-weight: 600;
            text-transform: uppercase;
            font-size: 0.85em;
            letter-spacing: 1px;
        }

        tbody tr {
            border-bottom: 1px solid #e0e0e0;
            transition: all 0.3s ease;
        }

        tbody tr:hover {
            background: linear-gradient(90deg, #f8f9ff 0%, #fff 100%);
            transform: scale(1.01);
        }

        tbody tr:last-child {
            border-bottom: none;
        }

        td {
            padding: 15px;
            color: #333;
        }

        .time-cell {
            font-weight: 500;
            color: #0b174e;
        }

        .temp-cell {
            font-weight: 600;
            font-size: 1.1em;
            color: #071646;
        }

        .temp-cell::after {
            content: ' °C';
            font-weight: normal;
            font-size: 0.9em;
            color: #6d6a6a;
        }

        @media (max-width: 600px) {
            .container {
                padding: 20px;
            }

            h1 {
                font-size: 1.5em;
            }

            th,
            td {
                padding: 10px;
                font-size: 0.9em;
            }
        }
</style>
