<template>
  <v-form>
    <v-container fluid>
      <v-row align="center" justify="center" class="py-0 my-0" dense no-gutters>
        <v-col cols="12" class="d-flex flex-column justify-center" align="center" justify="center">
          <v-img
              :src="require('../assets/logo_gold.svg')"
              class="my-0 py-0"
              contain
              height="100"
            />
          <h1 class="display-1 font-weight-bold mb-3 text-center">
            Wellness Checker
          </h1>
        </v-col>
      </v-row>
      <v-row align="center" justify="center" dense no-gutters>
        <v-col cols="12" class="d-flex flex-column justify-center">
          <v-card class="elevation-12" min-width="300">
            <v-card-text class="mx-6 px-6">
              <p class="title font-weight-regular pb-5 pr-6">
                Please complete this form each work day before 8:00 am.  
              </p>
              <v-row class="headline grey lighten-3 px-2 py-2 mb-4 mr-8" v-if="userPerson.isSurrogateStaff">
                Select a parent (if submitting on behalf of someone else)
              </v-row>
              <v-row class="px-4 mr-8" dense v-if="userPerson.isSurrogateStaff">
                  <v-autocomplete
                    :items="parents"
                    color="white"
                    item-text="displayText"
                    label="Parent"
                    v-model="selectedParent"
                    item-value="email"
                  ></v-autocomplete>
              </v-row>

              <v-row class="headline grey lighten-3 px-2 py-2 mb-4 mr-8">
                Select the family members for which this form applies
              </v-row>
              <v-row v-if="userParent == -1" class="px-4 mr-6" dense>
                <v-alert v-if="userParent == -1" type="error">
                  The system is not able to find you and your family in the database. Please log in using the email address the school has on file for you. Otherwise, please notify the school to correct the issue.
                </v-alert>
              </v-row>
              <v-row v-if="formSubmissionStatus == 'success'" class="px-4 mr-6" dense>
                <v-alert v-if="formSubmissionStatus == 'success'" type="success" dismissible v-model="formSubmitSuccess">
                  Thank you! Your Wellness Checker has been successfully received
                </v-alert>
              </v-row>
              <v-row v-if="userParent != -1" class="px-4" dense>
                <div class="text-body-1 pr-6">If not all family members have the same answers to the form, please submit a separate form for each.</div>
              </v-row>
              <v-row v-if="userParent != -1 && userParent.family" class="px-4" dense>
                <div class="text-body-1 pr-6" v-for="person in userParent.family.members.items" :key="person.id">
                  <v-checkbox v-model="formPersons" v-if="person.isStaff == true || person.personType=='student'" :value="person" :label="person.firstName"/>
                </div>
              </v-row>

              <v-row class="headline grey lighten-3 px-2 py-2 mb-4 mr-8">
                Do you or your child(ren) have any of the following symptoms?
              </v-row>

              <v-row class="px-4" dense>
                <div class="text-body-1">Fever of 100&#176;F or greater</div>
              </v-row>
              <v-row class="pl-8" dense>
                <v-radio-group v-model="formWellnessCheck.symptomFever" class="my-0 py-0" row dense>
                  <v-radio label="Yes" value="yes" />
                  <v-radio label="No" value="no" />
                </v-radio-group>
              </v-row>

              <v-row class="px-4" dense>
                <div class="text-body-1">Sore throat</div>
              </v-row>
              <v-row class="pl-8" dense>
                <v-radio-group v-model="formWellnessCheck.symptomSoreThroat" class="my-0 py-0" row dense>
                  <v-radio label="Yes" value="yes" />
                  <v-radio label="No" value="no" />
                </v-radio-group>
              </v-row>

              <v-row class="px-4" dense>
                <div class="text-body-1">New cough that causes difficulty breathing or change in baseline cough</div>
              </v-row>
              <v-row class="pl-8" dense>
                <v-radio-group v-model="formWellnessCheck.symptomNewCough" class="my-0 py-0" row dense>
                  <v-radio label="Yes" value="yes" />
                  <v-radio label="No" value="no" />
                </v-radio-group>
              </v-row>

              <v-row class="px-4" dense>
                <div class="text-body-1">Shortness of breath of difficulty breathing</div>
              </v-row>
              <v-row class="pl-8" dense>
                <v-radio-group v-model="formWellnessCheck.symptomShortnessOfBreath" class="my-0 py-0" row dense>
                  <v-radio label="Yes" value="yes" />
                  <v-radio label="No" value="no" />
                </v-radio-group>
              </v-row>

              <v-row class="px-4" dense>
                <div class="text-body-1">Muscle or body aches</div>
              </v-row>
              <v-row class="pl-8" dense>
                <v-radio-group v-model="formWellnessCheck.symptomMuscleAche" class="my-0 py-0" row dense>
                  <v-radio label="Yes" value="yes" />
                  <v-radio label="No" value="no" />
                </v-radio-group>
              </v-row>

              <v-row class="px-4" dense>
                <div class="text-body-1">Diarrhea, vomiting, or abdominal pain</div>
              </v-row>
              <v-row class="pl-8" dense>
                <v-radio-group v-model="formWellnessCheck.symptomDiarrhea" class="my-0 py-0" row dense>
                  <v-radio label="Yes" value="yes" />
                  <v-radio label="No" value="no" />
                </v-radio-group>
              </v-row>

              <v-row class="px-4" dense>
                <div class="text-body-1">New onset of a headache</div>
              </v-row>
              <v-row class="pl-8" dense>
                <v-radio-group v-model="formWellnessCheck.symptomHeadache" class="my-0 py-0" row dense>
                  <v-radio label="Yes" value="yes" />
                  <v-radio label="No" value="no" />
                  <div class="ml-4"></div>
                </v-radio-group>
              </v-row>

              <v-row class="px-4" dense>
                <div class="text-body-1">Loss of taste or smell</div>
              </v-row>
              <v-row class="pl-8" dense>
                <v-radio-group v-model="formWellnessCheck.symptomLossOfTasteOrSmell" class="my-0 py-0" row dense>
                  <v-radio label="Yes" value="yes" />
                  <v-radio label="No" value="no" />
                </v-radio-group>
              </v-row>

              <v-row class="px-4" dense>
                <div class="text-body-1">Congestion or runny nose</div>
              </v-row>
              <v-row class="pl-8" dense>
                <v-radio-group v-model="formWellnessCheck.symptomCongestion" class="my-0 py-0" row dense>
                  <v-radio label="Yes" value="yes" />
                  <v-radio label="No" value="no" />
                </v-radio-group>
              </v-row>

              <v-row class="px-4" dense>
                <div class="text-body-1">Fatigue</div>
              </v-row>
              <v-row class="pl-8" dense>
                <v-radio-group v-model="formWellnessCheck.symptomFatigue" class="my-0 py-0" row dense>
                  <v-radio label="Yes" value="yes" />
                  <v-radio label="No" value="no" />
                </v-radio-group>
              </v-row>

              <v-row class="headline grey lighten-3 px-2 py-2 mb-4 mr-8">
                Has your child had any potential exposure to COVID-19?
              </v-row>

              <v-row class="px-4" dense>
                <div class="text-body-1">Close contact (within 6 feet for 10 minutes or more) with a person with confirmed COVID-19?</div>
              </v-row>
              <v-row class="pl-8" dense>
                <v-radio-group v-model="formWellnessCheck.exposureCloseContact" class="my-0 py-0" row dense>
                  <v-radio label="Yes" value="yes" />
                  <v-radio label="No" value="no" />
                </v-radio-group>
              </v-row>

              <v-row class="px-4" dense>
                <div class="text-body-1">Traveled to a state or territory on the NYS travel advisory list within the past 14 days, requiring quarantine? <a target="_blank" href="https://coronavirus.health.ny.gov/covid-19-travel-advisory">https://coronavirus.health.ny.gov/covid-19-travel-advisory</a></div>
              </v-row>
              <v-row class="pl-8" dense>
                <v-radio-group v-model="formWellnessCheck.exposureRecentTravel" class="my-0 py-0" row dense>
                  <v-radio label="Yes" value="yes" />
                  <v-radio label="No" value="no" />
                </v-radio-group>
              </v-row>

              <v-row class="headline grey lighten-3 px-2 py-2 mb-4 mr-8">
                Notes
              </v-row>
              <v-row class="pl-8 pr-8 mr-10" dense>
                <v-textarea v-model="formWellnessCheck.notes" filled label="Enter any notes you wish to submit with the form" rows="2"></v-textarea>
              </v-row>

            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" width="200" v-on:click="submitWellnessCheck">Submit</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
            <v-alert v-if="formSubmissionStatus == 'error'" type="error" dismissible v-model="formSubmitError">
              There was an error. Please try resubmitting your form, ensuring all fields are correctly populated. All fields are required. If this error remains, please notify the school at drop-off.
            </v-alert>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>

  import { API, Auth } from 'aws-amplify';
  import { createWellnessCheck } from '../graphql/mutations';
  import { listPersons } from '../graphql/queries';

  export default {
    name: 'wellnessform',
    async beforeCreate() {
      try {
        const User = await Auth.currentAuthenticatedUser()
        // const Session = await Auth.currentSession() // DEBUG
        // const UserInfo = await Auth.currentUserInfo() // DEBUG
        // const UserPoolInfo = await Auth.currentUserPoolUser() // DEBUG
        this.User = User;
        this.signedIn = 'true'
        // console.log('User is signedIn') // DEBUG
        // console.log('CurrentAuthenticatedUser: ' + JSON.stringify(User)) // DEBUG
        // console.log('Current Session: ' + JSON.stringify(Session)) // DEBUG
        // console.log('Current User Info: ' + JSON.stringify(UserInfo)) // DEBUG
        // console.log('Current UserPoolInfo Info: ' + JSON.stringify(UserPoolInfo)) // DEBUG
        
        this.userPerson = await this.getUserPerson(this.User.attributes.email.toLowerCase())
        this.userParent = this.userPerson

        if (this.userPerson.isStaff) {
          this.allParents = await this.getAllParents();
          // console.log("parents: " + JSON.stringify(this.allParents)) // DEBUG
        }

        // console.log("Admin check: " + User.signInUserSession.idToken.payload["cognito:groups"].indexOf("admins")); // DEBUG

      } catch (err) {
        this.signedIn = 'false'
      }
    },
    data: () => ({
      userPerson: {},
      userParent: {},
      allParents: [],
      selectedParent: undefined,
      formPersons: [],
      formWellnessCheck: {
        submissionDate: '',
        symptomFever: '',
        symptomSoreThroat: '',
        symptomNewCough: '',
        symptomShortnessOfBreath: '',
        symptomMuscleAche: '',
        symptomDiarrhea: '',
        symptomHeadache: '',
        symptomLossOfTasteOrSmell: '',
        symptomCongestion: '',
        symptomFatigue: '',
        exposureCloseContact: '',
        exposureRecentTravel: '',
        notes: ''
      },
      formSubmissionStatus: '',
      formSubmitSuccess: undefined,
      formSubmitError: undefined
    }),
    computed: {
      parents () {
        return this.allParents.map(parent => {
          const newDisplayText = parent.lastName + ', ' + parent.firstName + ' - ' + parent.email
          
          // console.log("parent value before assignment: " + JSON.stringify(parent)) // DEBUG

          const newParent = Object.assign({}, parent, { displayText: newDisplayText })

          // console.log("newParent value after assignment: " + JSON.stringify(newParent)) // DEBUG

          return newParent
        })
      },
    },
    watch: {
      selectedParent: async function() {
        // console.log("selectedParent: " + JSON.stringify(this.selectedParent)) // DEBUG
        this.userParent = await this.getUserPerson(this.selectedParent);
        this.formPersons = [];
      }
    },
    methods: {
      async getUserPerson(email) {
        try {
          if (!this.User) return -1;

          var person = undefined
          const personList = await API.graphql({
            query: listPersons,
            variables: {
              filter: {
                email: {
                  eq: email
                }
              }
            }
          });

          // console.log("personList: " + JSON.stringify(personList)) // DEBUG

          if (personList.data.listPersons.items.length == 1) {
            person = personList.data.listPersons.items[0]
            // console.log("getUserPerson: " + JSON.stringify(person)) // DEBUG
          } else {
            return -1
          }

          return person 

        } catch (err) {
          console.log('listPersons error: ' + JSON.stringify(err))
          return -1
        }
      },
      async getAllParents() {
        try {

          const parentList = await API.graphql({
            query: listPersons,
            variables: {
              filter: {
                personType: {
                  eq: 'parent'
                }
              }
            }
          });

          return parentList.data.listPersons.items

        } catch (err) {
          console.log('getAllFamilies error: ' + JSON.stringify(err))
          return -1
        }
      },
      async submitWellnessCheck() {
        try {

          const { formPersons, formWellnessCheck } = this;

          if (!formPersons || !formWellnessCheck) {
            this.formSubmissionStatus = 'error'; 
            this.formSubmitError = true
            return;
          }

          if (!formPersons.length) {
            this.formSubmissionStatus = 'error'; 
            this.formSubmitError = true
            return
          }

          if (formWellnessCheck.symptomFever == ''
            || formWellnessCheck.symptomSoreThroat == ''
            || formWellnessCheck.symptomNewCough == ''
            || formWellnessCheck.symptomShortnessOfBreath == ''
            || formWellnessCheck.symptomDiarrhea == ''
            || formWellnessCheck.symptomHeadache == ''
            || formWellnessCheck.symptomLossOfTasteOrSmell == ''
            || formWellnessCheck.symptomCongestion == ''
            || formWellnessCheck.symptomFatigue == ''
            || formWellnessCheck.exposureCloseContact == ''
            || formWellnessCheck.exposureRecentTravel == ''
          ) {
            this.formSubmissionStatus = 'error'; 
            this.formSubmitError = true
            return
          }
          
          // set the ISO-8601 date string for today's date. substring to get only the date portion per the needs of AWSDate on AppSync model
          var date = new Date();
          formWellnessCheck.submissionDate = date.toISOString().substring(0, 10);

          var p;
          for (p in formPersons) {

            formWellnessCheck.wellnessCheckPersonId = formPersons[p].id;
          
            // console.log("Submitted object: " + JSON.stringify(formWellnessCheck)) // DEBUG

            await API.graphql({
              query: createWellnessCheck,
              variables: {input: formWellnessCheck}
            });

            this.formSubmissionStatus = 'success';
            this.formSubmitSuccess = true;
            this.formPersons = [];
            window.scrollTo(0,0);

          }
        } catch (err) {
          console.log('Form submission error: ' + JSON.stringify(err))
          this.formSubmissionStatus = 'error';
          this.formSubmitError = true
        }

      }
    }
  }
</script>