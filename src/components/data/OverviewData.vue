 <template>
  <v-container class="d-flex flex-start" fill-height>
      <div style="height: 10%">
        <v-tabs>
          <v-tab @click="changeIndex(1)">Data Page</v-tab>
          <v-tab @click="changeIndex(2)">Category</v-tab>
          <v-tab @click="changeIndex(3)">Question</v-tab>
        </v-tabs>
      </div>
      <div style="height: 90%">
        <data-page v-if="this.indexTab == 1" />
        <category-page v-if="this.indexTab == 2" />
      </div>
  </v-container>
</template>
<script>
import CategoryPage from "../category/CategoryPage.vue";
import DataPage from "../question_answer/DataPage.vue";
export default {
  name: "OverviewData",
  components: {
    DataPage,
    CategoryPage,
  },
  data: () => ({
    alignments: ["start", "center", "end"],
    indexTab: 1,
    value: 1,
  }),
  methods: {
    changeIndex(index) {
      this.indexTab = index;
    },
  },
};
</script>