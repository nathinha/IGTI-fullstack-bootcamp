import mongoose from 'mongoose';

const accountSchema = mongoose.Schema({
  agencia: {
    type: Number,
    required: true
  },
  conta: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    required: true,
    min: [0, 'after operations should not be negative']
  },
  lastModified: {
    type: Date,
    default: Date.now
  }
});

const accountModel = mongoose.model('accounts', accountSchema);

export default accountModel;