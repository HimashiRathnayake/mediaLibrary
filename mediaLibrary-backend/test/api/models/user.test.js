const expect = require('chai').expect;
const mongoose = require('mongoose');
const faker = require('faker');

describe ('User Modal', ()=>{
    var User;

    beforeEach((done)=>{
        require('../../../api/models/user');
        User = mongoose.model('User');
        done();
    });
    
    describe ('User Modal failers', ()=>{
        it('OK, Should not save a user without a password', (done)=>{
            var user = new User({
                email: faker.internet.email()
            });
            user.save()
            .catch((err)=>{
                expect(err.message).to.exist
                .and.equals('User validation failed: password: Path `password` is required.');
                done();
            })
        })
    
        it('OK, Should not save a user without an email', (done)=>{
            var user = new User({
                password: faker.internet.password()
            });
            user.save()
            .catch((err)=>{
                expect(err.message).to.exist
                .and.equals('User validation failed: email: Path `email` is required.');
                done();
            })
        })
    
        it('OK, Should not save a user without both password and email', (done)=>{
            var user = new User({});
            user.save()
            .catch((err)=>{
                expect(err.message).to.exist
                .and.equals('User validation failed: password: Path `password` is required., email: Path `email` is required.');
                done();
            })
        })
    })
    
    describe('OK, User Model success', ()=>{
        it('Should save a user with both password and email', (done)=>{
            var user = new User({
                _id: mongoose.Types.ObjectId(),
                email: faker.internet.email(),
                password: faker.internet.password()
            });
            user.save().then((res)=>{
                expect(res).not.to.be.empty;
                expect(res).to.contain.property('_id');
                expect(res).to.contain.property('email');
                expect(res).to.contain.property('password');
                expect(res).to.contain.property('imgfavourites');
                expect(res).to.contain.property('audfavourites');
                expect(res).to.contain.property('vidfavourites');
                done();
            })
        })
    })
    
})
