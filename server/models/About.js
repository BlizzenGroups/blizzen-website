import mongoose from 'mongoose';

const aboutSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      default: 'About Blizzen Creations'
    },

    heroImage: {
      type: String,
      default: ''
    },

    heroDescription: {
      type: String,
      required: true
    },

    excellenceTitle: {
      type: String,
      default: 'Empowering IT Careers Through Excellence'
    },

    excellenceParagraph1: {
      type: String,
      default:
        'Blizzen Creations is a premier IT training and placement institute dedicated to transforming aspiring professionals into industry-ready experts. We combine theoretical knowledge with practical, hands-on experience to ensure our students are fully prepared for the demands of the modern tech industry.'
    },

    excellenceParagraph2: {
      type: String,
      default:
        "Our comprehensive programs cover the latest technologies and industry best practices, taught by experienced professionals who bring real-world insights into the classroom. With a focus on project-based learning and personalized mentorship, we've successfully launched thousands of careers in IT."
    },

    missionTitle: {
      type: String,
      default: 'Our Mission'
    },

    missionDescription: {
      type: String,
      required: true
    },

    visionTitle: {
      type: String,
      default: 'Our Vision'
    },

    visionDescription: {
      type: String,
      required: true
    },

    valuesTitle: {
      type: String,
      default: 'Our Core Values'
    },

    values: [
      {
        title: String,
        description: String,
        icon: String
      }
    ],

    team: [
      {
        name: String,
        position: String,
        bio: String,
        image: String
      }
    ],

    achievements: [
      {
        label: String,
        value: String
      }
    ],

    /** ⭐ NEW FIELD: scrollImages for Auto-Scrolling Slider */
    scrollImages: {
      type: [String],
      default: []
    },

    /** Why Choose Us Section */
    whyChooseUs: {
      sectionTitle: {
        type: String,
        default: 'Why Choose Blizzen Creations?'
      },
      sectionSubtitle: {
        type: String,
        default: 'What sets us apart from the rest'
      },
      features: [
        {
          title: {
            type: String,
            default: ''
          },
          description: {
            type: String,
            default: ''
          }
        }
      ]
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('About', aboutSchema);
