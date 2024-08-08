import mongoose from 'mongoose';

const leaveSchema = mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    leaveType: {
        type: String,
        enum: ['Sick', 'Casual', 'Paid'],
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    reason: {
        type: String,
        required: true
    }
}, { timestamps: true }); 

const Leave = mongoose.model('Leave', leaveSchema);
export default Leave;
