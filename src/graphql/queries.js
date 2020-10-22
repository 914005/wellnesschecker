/* eslint-disable */
// this is an auto generated file. This will be overwritten

// Note: I have manually modified the listPersons method to add the members object under family 

export const getFamily = /* GraphQL */ `
  query GetFamily($id: ID!) {
    getFamily(id: $id) {
      id
      name
      members {
        items {
          id
          personType
          isStaff
          isSurrogateStaff
          email
          firstName
          lastName
          gradeLevel
          teacher
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listFamilys = /* GraphQL */ `
  query ListFamilys(
    $filter: ModelFamilyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFamilys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        members {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPerson = /* GraphQL */ `
  query GetPerson($id: ID!) {
    getPerson(id: $id) {
      id
      personType
      isStaff
      isSurrogateStaff
      isExempt
      email
      firstName
      lastName
      gradeLevel
      teacher
      family {
        id
        name
        members {
          nextToken
        }
        createdAt
        updatedAt
      }
      wellnessChecks {
        items {
          id
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
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listPersons = /* GraphQL */ `
  query ListPersons(
    $filter: ModelPersonFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPersons(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        personType
        isStaff
        isSurrogateStaff
        isExempt
        email
        firstName
        lastName
        gradeLevel
        teacher
        family {
          id
          name
          members {
            items {
              email
              firstName
              gradeLevel
              id
              isStaff
              isSurrogateStaff
              lastName
              personType
            }
          }
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getWellnessCheck = /* GraphQL */ `
  query GetWellnessCheck($id: ID!) {
    getWellnessCheck(id: $id) {
      id
      submissionDate
      person {
        id
        personType
        isStaff
        isSurrogateStaff
        email
        firstName
        lastName
        gradeLevel
        teacher
        family {
          id
          name
          createdAt
          updatedAt
        }
        wellnessChecks {
          nextToken
        }
        createdAt
        updatedAt
      }
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
      createdAt
      updatedAt
    }
  }
`;
export const listWellnessChecks = /* GraphQL */ `
  query ListWellnessChecks(
    $filter: ModelWellnessCheckFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWellnessChecks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        submissionDate
        person {
          id
          personType
          isStaff
          isSurrogateStaff
          email
          firstName
          lastName
          gradeLevel
          teacher
          createdAt
          updatedAt
        }
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
