/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createFamily = /* GraphQL */ `
  mutation CreateFamily(
    $input: CreateFamilyInput!
    $condition: ModelFamilyConditionInput
  ) {
    createFamily(input: $input, condition: $condition) {
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
export const updateFamily = /* GraphQL */ `
  mutation UpdateFamily(
    $input: UpdateFamilyInput!
    $condition: ModelFamilyConditionInput
  ) {
    updateFamily(input: $input, condition: $condition) {
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
export const deleteFamily = /* GraphQL */ `
  mutation DeleteFamily(
    $input: DeleteFamilyInput!
    $condition: ModelFamilyConditionInput
  ) {
    deleteFamily(input: $input, condition: $condition) {
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
export const createPerson = /* GraphQL */ `
  mutation CreatePerson(
    $input: CreatePersonInput!
    $condition: ModelPersonConditionInput
  ) {
    createPerson(input: $input, condition: $condition) {
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
export const updatePerson = /* GraphQL */ `
  mutation UpdatePerson(
    $input: UpdatePersonInput!
    $condition: ModelPersonConditionInput
  ) {
    updatePerson(input: $input, condition: $condition) {
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
export const deletePerson = /* GraphQL */ `
  mutation DeletePerson(
    $input: DeletePersonInput!
    $condition: ModelPersonConditionInput
  ) {
    deletePerson(input: $input, condition: $condition) {
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
export const createWellnessCheck = /* GraphQL */ `
  mutation CreateWellnessCheck(
    $input: CreateWellnessCheckInput!
    $condition: ModelWellnessCheckConditionInput
  ) {
    createWellnessCheck(input: $input, condition: $condition) {
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
export const updateWellnessCheck = /* GraphQL */ `
  mutation UpdateWellnessCheck(
    $input: UpdateWellnessCheckInput!
    $condition: ModelWellnessCheckConditionInput
  ) {
    updateWellnessCheck(input: $input, condition: $condition) {
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
export const deleteWellnessCheck = /* GraphQL */ `
  mutation DeleteWellnessCheck(
    $input: DeleteWellnessCheckInput!
    $condition: ModelWellnessCheckConditionInput
  ) {
    deleteWellnessCheck(input: $input, condition: $condition) {
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
