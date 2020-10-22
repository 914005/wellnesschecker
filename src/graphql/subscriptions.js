/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateFamily = /* GraphQL */ `
  subscription OnCreateFamily {
    onCreateFamily {
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
export const onUpdateFamily = /* GraphQL */ `
  subscription OnUpdateFamily {
    onUpdateFamily {
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
export const onDeleteFamily = /* GraphQL */ `
  subscription OnDeleteFamily {
    onDeleteFamily {
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
export const onCreatePerson = /* GraphQL */ `
  subscription OnCreatePerson {
    onCreatePerson {
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
export const onUpdatePerson = /* GraphQL */ `
  subscription OnUpdatePerson {
    onUpdatePerson {
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
export const onDeletePerson = /* GraphQL */ `
  subscription OnDeletePerson {
    onDeletePerson {
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
export const onCreateWellnessCheck = /* GraphQL */ `
  subscription OnCreateWellnessCheck {
    onCreateWellnessCheck {
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
export const onUpdateWellnessCheck = /* GraphQL */ `
  subscription OnUpdateWellnessCheck {
    onUpdateWellnessCheck {
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
export const onDeleteWellnessCheck = /* GraphQL */ `
  subscription OnDeleteWellnessCheck {
    onDeleteWellnessCheck {
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
