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
      type: Date,
      required: true,
    },
    rollNo: {
      type: String,
    },
    rank: {
      type: String,
    },
    registrationForm: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "upload.files",
    },
    admitCard: { type: mongoose.Schema.Types.ObjectId, ref: "upload.files" },
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "upload.files",
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "upload.files",
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "upload.files",
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
    diploma_certificate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "upload.files",
    },
    paymentReceipt: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "upload.files",
    },
    candidateSignature: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "upload.files",
    },
    parentSignature: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "upload.files",
    },
    passportPhoto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "upload.files",
    },
    createdAt: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "upload.files",
    },
    applicationNumber: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Student =
  mongoose.models.Student || mongoose.model("Student", studentSchema);

export default Student;
