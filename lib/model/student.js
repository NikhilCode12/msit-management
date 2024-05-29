import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    programmeName: {
      type: String,
      required: true,
    },
    stream: {
      type: String,
      required: true,
    },
    shift: {
      type: String,
      required: true,
    },
    appNo: {
      type: String,
      required: true,
    },
    regDate: {
      type: String,
      required: true,
    },
    rollNo: {
      type: String,
    },
    rank: {
      type: String,
    },
    registrationForm: {
      type: String,
    },
    admitCard: {
      type: String,
    },
    first_name: {
      type: String,
      required: true,
    },
    middle_name: {
      type: String,
    },
    surname: {
      type: String,
      required: true,
    },
    father_first_name: {
      type: String,
      required: true,
    },
    father_middle_name: {
      type: String,
    },
    father_surname: {
      type: String,
      required: true,
    },
    mother_first_name: {
      type: String,
      required: true,
    },
    mother_middle_name: {
      type: String,
    },
    mother_surname: {
      type: String,
      required: true,
    },
    legible_postal_address: {
      type: String,
      required: true,
    },
    legible_contact: {
      type: String,
      required: true,
    },
    legible_email: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    category_certificate: {
      type: String,
    },
    region: {
      type: String,
      required: true,
    },
    board: {
      type: String,
      required: true,
    },
    roll_no: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    subject_1: {
      type: Number,
      required: true,
    },
    subject_2: {
      type: Number,
      required: true,
    },
    subject_3: {
      type: Number,
      required: true,
    },
    subject_4: {
      type: Number,
      required: true,
    },
    subject_5: {
      type: Number,
      required: true,
    },
    subject_6: {
      type: Number,
    },
    total_marks: {
      type: Number,
      required: true,
    },
    total_percentage: {
      type: Number,
      required: true,
    },
    marksheet_10: {
      type: String,
      required: true,
    },
    board_12: {
      type: String,
      required: true,
    },
    roll_no_12: {
      type: String,
      required: true,
    },
    year_12: {
      type: Number,
      required: true,
    },
    subject_1_12: {
      type: Number,
      required: true,
    },
    subject_2_12: {
      type: Number,
      required: true,
    },
    subject_3_12: {
      type: Number,
      required: true,
    },
    subject_4_12: {
      type: Number,
      required: true,
    },
    subject_5_12: {
      type: Number,
      required: true,
    },
    subject_6_12: {
      type: Number,
    },
    total_marks_12: {
      type: Number,
      required: true,
    },
    total_percentage_12: {
      type: Number,
      required: true,
    },
    marksheet_12: {
      type: String,
      required: true,
    },
    university: {
      type: String,
    },
    roll_no_university: {
      type: String,
    },
    subjects_1st_year: {
      type: String,
    },
    m_o_1: {
      type: Number,
    },
    t_m_1: {
      type: Number,
    },
    p_1: {
      type: Number,
    },
    subjects_2nd_year: {
      type: String,
    },
    m_o_2: {
      type: Number,
    },
    t_m_2: {
      type: Number,
    },
    p_2: {
      type: Number,
    },
    subjects_3rd_year: {
      type: String,
    },
    m_o_3: {
      type: Number,
    },
    t_m_3: {
      type: Number,
    },
    p_3: {
      type: Number,
    },
    t_m_total: {
      type: Number,
    },
    m_o_total: {
      type: Number,
    },
    p_total: {
      type: Number,
    },
    pcm_marks: {
      type: Number,
    },
    pcm_percentage: {
      type: Number,
    },
    diploma_certificate: {
      type: String,
    },
    paymentReceipt: {
      type: String,
      required: true,
    },
    candidateSignature: {
      type: String,
      required: true,
    },
    parentSignature: {
      type: String,
      required: true,
    },
    passportPhoto: {
      type: String,
      required: true,
    },
    createdAt: {
      type: String,
      required: true,
    },
    applicationNumber: {
      type: String,
      unique: true,
      required: true,
    },
    choices: {
      btechChecked: {
        cse_1st_shift: { type: Boolean, default: false },
        it_1st_shift: { type: Boolean, default: false },
        ece_1st_shift: { type: Boolean, default: false },
        eee_1st_shift: { type: Boolean, default: false },
        cse_2nd_shift: { type: Boolean, default: false },
        it_2nd_shift: { type: Boolean, default: false },
        ece_2nd_shift: { type: Boolean, default: false },
      },
      leToBtechChecked: {
        cse_1st_shift_le: { type: Boolean, default: false },
        it_1st_shift_le: { type: Boolean, default: false },
        ece_1st_shift_le: { type: Boolean, default: false },
        eee_1st_shift_le: { type: Boolean, default: false },
        cse_2nd_shift_le: { type: Boolean, default: false },
        it_2nd_shift_le: { type: Boolean, default: false },
        ece_2nd_shift_le: { type: Boolean, default: false },
      },
    },
  },
  { timestamps: true }
);

const Student =
  mongoose.models.Student || mongoose.model("Student", studentSchema);

export default Student;
