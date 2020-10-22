
export const listPersonsForWcReport = /* GraphQL */ `
  query ListPersons(
    $filter: ModelPersonFilterInput
    $wcfilter: ModelWellnessCheckFilterInput
  ) {
    listPersons(filter: $filter) {
      items {
        id
        personType
        isStaff
        firstName
        lastName
        gradeLevel
        teacher
        wellnessChecks(filter: $wcfilter) {
          items {
            submissionDate
            symptomFever
            symptomSoreThroat
            symptomNewCough
            symptomShortnessOfBreath
            symptomMuscleAche
            symptomDiarrhea
            symptomHeadache
            symptomLossOfTasteOrSmell
            symptomCongestion
            symptomFatigue
            exposureCloseContact
            exposureRecentTravel
            notes
          }
        }
      }
      nextToken
    }
  }
`;
