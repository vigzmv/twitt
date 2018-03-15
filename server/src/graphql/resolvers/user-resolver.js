import User from '../../models/User';

export default {
  signup: async (_, { fullName, ...rest }) => {
    const [firstName, ...lastName] = fullName.split(' ');
    const user = await User.create({ firstName, lastName, ...rest });

    return {
      token: user.createToken,
    };
  },

  login: async (_, { email, password }) => {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User doesn't exist!");
    }

    if (!user.authencateUser(password)) {
      throw new Error('Wrong password');
    }

    return user;
  },
};
