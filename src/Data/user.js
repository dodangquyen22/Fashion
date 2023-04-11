const mongoose = require('mongoose');
const User = require('./modulers/User');

mongoose.connect('mongodb://localhost:27017/Fashion');

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
    process.exit(-1);
});

mongoose.connection.once('open', () => {
    console.log('MongoDB connected.');

    // Thêm dữ liệu mẫu vào collection User
    User.create([{
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe@example.com',
            password: 'password',
            address: '123 Main St, Anytown, USA',
            phoneNumber: '555-1234',
            role: '6064b4a4f7a4a91b8c4cf4e1'
        },
        {
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'janedoe@example.com',
            password: 'password',
            address: '456 Oak St, Anytown, USA',
            phoneNumber: '555-5678',
            role: '6064b4a4f7a4a91b8c4cf4e2'
        }
    ], (err, users) => {
        if (err) {
            console.error('Error creating users:', err);
            process.exit(-1);
        }

        console.log('Users created:', users);
        process.exit(0);
    });
});