<template>
  <v-app>
    <v-app-bar color="green" app>
      <v-app-bar-title color="white">Sistem Yöneticiliği</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-row>
        <v-col lg="4" md="6" cols="12">
          <v-card>
            <v-card-title>Merhaba {{ ip }}</v-card-title>
            <v-card-subtitle>
              {{ new Date().toLocaleString() }} tarihinde bağlandınız.<br>
              Bu site {{ visitors.length }} kez ziyaret edildi.
            </v-card-subtitle>
          </v-card>
          <v-card max-width="800" v-if="grouped">
            <v-card-title>Günlük Ziyaret</v-card-title>
            <chart :type="'pie'" :options="grouped.options"></chart>
          </v-card>
        </v-col>
        <v-col lg="8" md="6" cols="12">
            <v-simple-table fixed-header height="600px">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    Tarih
                  </th>
                  <th class="text-left">
                    IP Adresi
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in visitors"
                  :key="item.id"
                >
                  <td>{{ new Date(item.timestamp).toLocaleString() }}</td>
                  <td>{{ item.ip_addr }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Chart from "./components/Chart.vue";
export default {
  name: "App",
  components: {
    Chart,
  },
  created() {
    this.$store
      .dispatch("fetchIP")
      .then(() => this.$store.dispatch("fetchVisitors"))
      .then(()=> this.$store.dispatch("fetchGrouped"))
  },
  computed: {
    ...mapGetters(["ip", "visitors",'grouped']),
  },
  methods: {
    ...mapActions(["fetchVisitors", "fetchIP", 'fetchGrouped']),
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
