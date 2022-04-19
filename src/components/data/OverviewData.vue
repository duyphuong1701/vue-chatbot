 <template>
  <v-container fluid style="margin: 0px; padding: 0px; width: 100%" class="d-flex flex-start" fill-height>
    <div style="height: 10%">
      <v-tabs>
        <v-tab @click="changeIndex(1)">Data Page</v-tab>
        <v-tab @click="changeIndex(2)">Category</v-tab>
        <v-tab @click="changeIndex(3)">Question</v-tab>
        <v-tab @click="changeIndex(4)">Answer</v-tab>
      </v-tabs>
    </div>
    <div style="height: 90%; width: 100%">
      <data-page v-if="this.indexTab == 1" />
      <category-table v-if="this.indexTab == 2" />
      <question-table v-if="this.indexTab == 3" />
      <answer-table v-if="this.indexTab == 4" />
    </div>
  </v-container>
</template>
<script>
import DataPage from "../question_answer/DataPage.vue";
import QuestionTable from "../question/QuestionTable.vue";
import AnswerTable from "../answer/AnswerTable.vue";
import CategoryTable from '../category/CategoryTable.vue';
export default {
  name: "OverviewData",
  components: {
    DataPage,
    CategoryTable,
    QuestionTable,
    AnswerTable,
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