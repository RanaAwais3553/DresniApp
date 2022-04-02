export const enValidation = {
    email: {
        presence: {
            message: '^Please enter an email address'
        },
        email: {
            message: '^Please enter a valid email address'
        }
    },

    password: {
        presence: {
            message: '^Please enter a password'
        },
        length: {
            minimum: 6,
            message: '^Your password must be at least 6 characters'
        }
    },

    fullname: {
        presence: {
            message: '^Please enter a full name'
        },
        length: {
            minimum: 4,
            message: '^Your full name must be at least 4 characters',
        },
    },

    contactNumber: {
        presence: {
            message: '^Mobile number field can not be empty'
        },
        length: {
            minimum: 7,
            message: '^Your mobile number must be at least 7 numbers',
        },
    },

    nationality: {
        presence: {
            message: '^Please enter your nationality'
        },
    },

    dateOfBirth: {
        presence: {
            message: '^Please enter a Date Of Birth'
        },
    },

    gender: {
        presence: {
            message: '^Please enter a gender'
        },
    },

    confirmpass: {
        presence: {
            message: '^Please RE-enter the Password'
        },
        length: {
            minimum: 6,
            message: '^Your Re-enter Password must be at least 6 characters',
        },

    },

    qualification: {
        presence: {
            message: '^Please select your qualification'
        },
    },

    area: {
        presence: {
            message: '^Please enter your area'
        },
    },

    language: {
        presence: {
            message: '^Please select your language'
        },
    },

    workExperience: {
        presence: {
            message: '^Please enter your work experience'
        },
    },

    country: {
        presence: {
            message: '^Please select your country'
        },
    },

    nationalId: {
        presence: {
            message: '^Please enter your National ID'
        },
    },

    tlanguages: {
        presence: {
            message: '^Please select your teaching languages'
        },
    },

    teachingSubjects: {
        presence: {
            message: '^Please select your teaching subjects'
        },
    },

    teachMode: {
        presence: {
            message: '^Please select how can you teach'
        },
    },

    pricing: {
        presence: {
            message: '^Please enter your pricing'
        },
    },

    profilePhoto: {
        presence: {
            message: '^Please attach your profile picture'
        },
    },

    expertise: {
        presence: {
            message: '^Please select your expertise'
        },
    },

    areaOfServices: {
        presence: {
            message: '^Please select your services offer'
        },
    },

    biography: {
        presence: {
            message: '^Please enter your biography'
        },
    },

    personalBio: {
        presence: {
            message: '^Please enter your personal bio'
        },
    },

    bank: {
        presence: {
            message: '^Please select bank name'
        },
    },

    currency: {
        presence: {
            message: '^Please select currency'
        },
    },

    accHolderName: {
        presence: {
            message: '^Please enter bank account name'
        },
    },

    accNumber: {
        presence: {
            message: '^Please enter bank account number'
        },
    },

    ibanCode: {
        presence: {
            message: '^Please enter bank iban code'
        },
    },

    swiftCode: {
        presence: {
            message: '^Please enter bank swift code'
        },
    },

    gmtOffset: {
        presence: {
            message: '^Please select GMT Offset'
        },
    },

    bookingBreak: {
        presence: {
            message: '^Please select Booking break'
        },
    },
}