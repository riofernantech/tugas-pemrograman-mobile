<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Blank</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="container">
        <div class="header">
            <button @click="fetchData" class="refresh-btn">Refresh</button>
        </div>
        <table>
            <tbody>
                <tr v-if="isError">
                    <td colspan="3" style="text-align: center; color: red;">
                        Error mengambil Data
                    </td>
                </tr>
                <tr v-if="isLoading">
                    <td colspan="3" style="text-align: center; color: black;">
                        <h3>
                          Memuat Data...
                        </h3>
                    </td>
                </tr>
                <tr v-else v-for="value in data" :key="value.rank">
                    <td class="rank-cell">
                        Rank<br>
                        <span class="rank-number">{{ value.rank }}</span>
                    </td>
                    <td>
                        <div class="name-cell">{{ value.name }}</div>
                        <div class="symbol-cell">{{value.symbol}}</div>
                    </td>
                    <td>
                        <div class="currency-cell">USD</div>
                        <div class="price-cell">{{value.price_usd}}</div>
                    </td>
                </tr>

            </tbody>
        </table>
    </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { ref, onMounted } from 'vue';

const data = ref<Crypto[]>([]);
const isLoading = ref<boolean>(true);
const isError = ref<boolean>(false);

interface Crypto{
  rank: string;
  name: string;
  symbol: string;
  price_usd: string;
}

function mapResponse(param: any): void {
  for (const item of param) {
    data.value.push({
      rank: item.rank,
      name: item.name,
      symbol: item.symbol,
      price_usd: item.price_usd,
    });
  }
}

async function fetchData(): Promise<void> {
  try {
    isLoading.value = true;
    const response = await fetch("https://api.coinlore.net/api/tickers/");
    const data = await response.json();
    mapResponse(data.data);
  } catch (error) {
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.container {
            margin: auto;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            max-width: 400px;
            width: 100%;
            overflow: hidden;
        }

        .header {
            background: #f8f9fa;
            padding: 15px;
            text-align: center;
            border-bottom: 1px solid #e0e0e0;
        }

        .refresh-btn {
            background: #0d6efd;
            color: white;
            border: none;
            padding: 8px 20px;
            border-radius: 5px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: background 0.3s;
        }

        .refresh-btn:hover {
            background: #0b5ed7;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        tbody tr {
            border-bottom: 1px solid #e8e8e8;
        }

        tbody tr:last-child {
            border-bottom: none;
        }

        td {
            padding: 12px 15px;
            font-size: 14px;
        }

        .rank-cell {
            color: #888;
            font-size: 12px;
            width: 60px;
        }

        .rank-number {
            font-weight: 600;
            color: #333;
        }

        .name-cell {
            font-weight: 600;
            color: #333;
        }

        .symbol-cell {
            color: #888;
            font-size: 12px;
        }

        .currency-cell {
            color: #888;
            font-size: 12px;
            text-align: right;
        }

        .price-cell {
            font-weight: 600;
            color: #333;
            text-align: right;
        }

        @media (max-width: 480px) {
            .container {
                max-width: 100%;
            }

            td {
                padding: 10px 12px;
                font-size: 13px;
            }
        }
</style>
