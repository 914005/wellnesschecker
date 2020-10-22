<template>
  <v-container fluid>
    <v-row align="center" justify="center" class="py-0 my-0" dense no-gutters>
      <v-col cols="12" sm="12" align="center" justify="center">
        <h1 class="display-1 font-weight-bold text-center">
          Daily Submission Report
        </h1>
      </v-col>
    </v-row>
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="12" sm="6" md="4" >
        <v-menu
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="reportStartDate"
              label="Date for the Report"
              prepend-icon="event"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="reportStartDate" @input="menu2 = false"></v-date-picker>
        </v-menu>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row>
      <v-col cols="2" sm="2" align="right" justify="right">
        <v-spacer></v-spacer>
      </v-col>
      <v-col cols="2" sm="2" align="right" justify="right">
        <v-spacer></v-spacer>
      </v-col>
      <v-col cols="4" sm="4" align="center" justify="center">
        <div class="text-h5">Qty Forms Submitted: {{ this.countSubmitted }}</div>
      </v-col>
      <v-col cols="2" sm="2" align="right" justify="right">
        <v-spacer></v-spacer>
      </v-col>
      <v-col cols="2" sm="2" align="right" justify="right">
        <download-excel
          :data = "reportData">
          <a>
            Download Data
            <v-icon>mdi-download</v-icon>
          </a>
        </download-excel>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            Staff and Students
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search/Filter"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="reportData"
            item-key="id"
            :search="search"
            :expanded.sync="expanded"
            show-expand
            :single-expand="true"
            multi-sort
          > 
          
            <template v-slot:item.firstName="{ item }">
              <v-chip :color="getColor(item)" light>{{ item.firstName}}</v-chip>
            </template>
            <template v-slot:expanded-item="{ headers, item }">
              <!-- <td :colspan="headers.length">Notes: {{ (item.wellnessChecks.items[0]) ? item.wellnessChecks.items[0].notes : null  }}</td> -->
              <td :colspan="headers.length">Notes: {{ (item.notes) ? item.notes : null  }}</td>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

  import { API, Auth } from 'aws-amplify';
  import { listPersons } from '../graphql/queries';
  import { listPersonsForWcReport } from '../graphql/custom-queries';
  import Vue from 'vue'
  import JsonExcel from 'vue-json-excel'
 
  Vue.component('downloadExcel', JsonExcel)

  export default {
    name: 'reports',
    async beforeCreate() {
      try {
        const User = await Auth.currentAuthenticatedUser()
        this.User = User;
        this.signedIn = 'true'
        // console.log('User is signedIn')
        // console.log('CurrentAuthenticatedUser: ' + JSON.stringify(User)) // DEBUG
        this.userPerson = await this.getUserPerson();
      } catch (err) {
        this.signedIn = 'false'
      }
    },
    async created() {
      await this.getByPersonReport();
    },
    data: () => ({
      userPerson: undefined,
      byPersonReport: {
        data: {
          listPersons: {
            items: []
          }
        }
      },
      reportData: [],
      reportStartDate: new Date().toISOString().substr(0, 10),
      modal: false,
      menu2: false,
      countSubmitted: 0,
      search: '',
      expanded: [],
      headers: [
        {
          text: 'Person Type',
          align: 'center',
          value: 'personType',
          class: 'sticky-header white'
        },
        {
          text: 'Last Name',
          align: 'start',
          value: 'lastName',
          class: 'sticky-header white'
        },
        {
          text: 'First Name',
          align: 'start',
          value: 'firstName',
          class: 'sticky-header white'
        },        
        {
          text: 'Grade Level',
          align: 'center',
          value: 'gradeLevel',
          class: 'sticky-header white'
        },
        {
          text: 'Teacher',
          align: 'center',
          value: 'teacher',
          class: 'sticky-header white'
        },
        {
          text: 'Is Staff',
          align: 'center',
          value: 'isStaff',
          class: 'sticky-header white'
        },
        {
          text: 'Submission Date',
          align: 'center',
          value: 'submissionDate',
          class: 'sticky-header white'
        },
        {
          text: 'Fever',
          align: 'start',
          value: 'symptomFever',
          class: 'sticky-header white'
        },
        {
          text: 'Sore Throat',
          align: 'start',
          value: 'symptomSoreThroat',
          class: 'sticky-header white'
        },
        {
          text: 'New Cough',
          align: 'start',
          value: 'symptomNewCough',
          class: 'sticky-header white'
        },
        {
          text: 'Shortness of Breath',
          align: 'start',
          value: 'symptomShortnessOfBreath',
          class: 'sticky-header white'
        },
        {
          text: 'Muscle Ache',
          align: 'start',
          value: 'symptomMuscleAche',
          class: 'sticky-header white'
        },
        {
          text: 'Diarrhea',
          align: 'start',
          value: 'symptomDiarrhea',
          class: 'sticky-header white'
        },
        {
          text: 'Headache',
          align: 'start',
          value: 'symptomHeadache',
          class: 'sticky-header white'
        },
        {
          text: 'Loss of Taste or Smell',
          align: 'start',
          value: 'symptomLossOfTasteOrSmell',
          class: 'sticky-header white'
        },
        {
          text: 'Congestion',
          align: 'start',
          value: 'symptomCongestion',
          class: 'sticky-header white'
        },
        {
          text: 'Fatigue',
          align: 'start',
          value: 'symptomFatigue',
          class: 'sticky-header white'
        },
        {
          text: 'Close Contact',
          align: 'start',
          value: 'exposureCloseContact',
          class: 'sticky-header white'
        },
        {
          text: 'Recent Travel',
          align: 'start',
          value: 'exposureRecentTravel',
          class: 'sticky-header white'
        },
        { 
          text: 'Notes', 
          value: 'data-table-expand',
          class: 'sticky-header white'
        }
      ]
    }),
    watch: {
      reportStartDate: 'getByPersonReport'
    },
    methods: {
      async getUserPerson() {
        try {
          if (!this.User) return;

          var person = undefined
          const personList = await API.graphql({
            query: listPersons,
            variables: {
              filter: {
                email: {
                  contains: this.User.attributes.email
                }
              }
            }
          });

          // console.log("personList: " + JSON.stringify(personList)) // DEBUG

          if (personList.data.listPersons.items.length == 1) {
            person = personList.data.listPersons.items[0]
            // console.log("getUserPerson: " + JSON.stringify(person)) // DEBUG
          }

          return person 

        } catch (err) {
          console.log('listPersons error: ' + JSON.stringify(err))
        }
      },
      async getByPersonReport() {
        try {
          
          this.byPersonReport = await API.graphql({
            query: listPersonsForWcReport,
            variables: {
              filter: {
                or: [
                  {personType: {eq: 'student'}},
                  {isStaff: {eq: true}}
                ]
              },
              wcfilter: {
                submissionDate: {
                  eq: this.reportStartDate
                }
              }
            }
          })

          // reset the form variables
          this.reportData = []
          this.countSubmitted = 0
          var reportItem = {}

          for (var i in this.byPersonReport.data.listPersons.items) {

            reportItem.id = this.byPersonReport.data.listPersons.items[i].id
            reportItem.firstName = this.byPersonReport.data.listPersons.items[i].firstName
            reportItem.lastName = this.byPersonReport.data.listPersons.items[i].lastName
            reportItem.personType = this.byPersonReport.data.listPersons.items[i].personType
            reportItem.isStaff = this.byPersonReport.data.listPersons.items[i].isStaff
            reportItem.gradeLevel = this.byPersonReport.data.listPersons.items[i].gradeLevel
            reportItem.teacher = this.byPersonReport.data.listPersons.items[i].teacher

            if (this.byPersonReport.data.listPersons.items[i].wellnessChecks.items.length >= 1) {
              
              this.countSubmitted++

              reportItem.submissionDate = this.byPersonReport.data.listPersons.items[i].wellnessChecks.items[0].submissionDate
              reportItem.symptomFever = this.byPersonReport.data.listPersons.items[i].wellnessChecks.items[0].symptomFever
              reportItem.symptomSoreThroat = this.byPersonReport.data.listPersons.items[i].wellnessChecks.items[0].symptomSoreThroat
              reportItem.symptomNewCough = this.byPersonReport.data.listPersons.items[i].wellnessChecks.items[0].symptomNewCough
              reportItem.symptomShortnessOfBreath = this.byPersonReport.data.listPersons.items[i].wellnessChecks.items[0].symptomShortnessOfBreath
              reportItem.symptomMuscleAche = this.byPersonReport.data.listPersons.items[i].wellnessChecks.items[0].symptomMuscleAche
              reportItem.symptomDiarrhea = this.byPersonReport.data.listPersons.items[i].wellnessChecks.items[0].symptomDiarrhea
              reportItem.symptomHeadache = this.byPersonReport.data.listPersons.items[i].wellnessChecks.items[0].symptomHeadache
              reportItem.symptomLossOfTasteOrSmell = this.byPersonReport.data.listPersons.items[i].wellnessChecks.items[0].symptomLossOfTasteOrSmell
              reportItem.symptomCongestion = this.byPersonReport.data.listPersons.items[i].wellnessChecks.items[0].symptomCongestion
              reportItem.symptomFatigue = this.byPersonReport.data.listPersons.items[i].wellnessChecks.items[0].symptomFatigue
              reportItem.exposureCloseContact = this.byPersonReport.data.listPersons.items[i].wellnessChecks.items[0].exposureCloseContact
              reportItem.exposureRecentTravel = this.byPersonReport.data.listPersons.items[i].wellnessChecks.items[0].exposureRecentTravel
              reportItem.notes = this.byPersonReport.data.listPersons.items[i].wellnessChecks.items[0].notes

            } else {

              reportItem.submissionDate = ""
              reportItem.symptomFever = ""
              reportItem.symptomSoreThroat = ""
              reportItem.symptomNewCough = ""
              reportItem.symptomShortnessOfBreath = ""
              reportItem.symptomMuscleAche = ""
              reportItem.symptomDiarrhea = ""
              reportItem.symptomHeadache = ""
              reportItem.symptomLossOfTasteOrSmell = ""
              reportItem.symptomCongestion = ""
              reportItem.symptomFatigue = ""
              reportItem.exposureCloseContact = ""
              reportItem.exposureRecentTravel = ""
              reportItem.notes = ""

            }

            // console.log("reportItem " + JSON.stringify(reportItem)) // DEBUG

            this.reportData.push(reportItem)
            reportItem = {}
          }
          
          // console.log("reportData: " + JSON.stringify(this.reportData)) // DEBUG

          // console.log("byPersonReport: " + JSON.stringify(this.byPersonReport)) //DEBUG

        } catch (err) {
          console.log('getByPersonReport error: ' + JSON.stringify(err))
        }
      },
      getColor (wcItem) {

        console.log("getColor item: " + JSON.stringify(wcItem)) // DEBUG

        if (!wcItem.submissionDate || wcItem.submissionDate == "") {
          return 'orange lighten-3'
        } else if (
            wcItem.symptomFever == 'yes' ||
            wcItem.symptomSoreThroat == 'yes' ||
            wcItem.symptomNewCough == 'yes' ||
            wcItem.symptomShortnessOfBreath == 'yes' ||
            wcItem.symptomMuscleAche == 'yes' ||
            wcItem.symptomDiarrhea == 'yes' ||
            wcItem.symptomHeadache == 'yes' ||
            wcItem.symptomLossOfTasteOrSmell == 'yes' ||
            wcItem.symptomCongestion == 'yes' ||
            wcItem.symptomFatigue == 'yes' ||
            wcItem.exposureCloseContact == 'yes' ||
            wcItem.exposureRecentTravel == 'yes') {
              return 'red lighten-3'
        } else {
          return 'light-green lighten-3'
        }
      }
    }
  }
</script>

<style scoped>
.v-data-table /deep/ .sticky-header {
  position: sticky;
  top: 70px;
  z-index: 100;
}
.v-data-table /deep/ .v-data-table__wrapper {
  overflow: unset;
}
</style>