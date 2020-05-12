process.env.NODE_ENV = 'test';
process.env.JWT_KEY = "secret";
process.env.MONGO_ATLAS_PW = "mediaLibraryPassword";

const expect = require('chai').expect;
const request = require('supertest');
const faker = require('faker');
const mongoose = require('mongoose');

const app =require('../../../app.js');
const conn = require('../../../db.js');

let token; 
let imageId;
let audioId;
let videoId;
let folderId = mongoose.Types.ObjectId();
let faketype = faker.random.word();

describe ('Favourite routes', ()=>{
    const signup = '/user/signup';
    
    const preSave = {email: faker.internet.email(), password: faker.internet.password()};
    const fakeId= mongoose.Types.ObjectId();

    before (done=>{
        request(app)
        .post(signup)
        .send(preSave)
        .then((res)=>{
            expect(res.status).to.equal(201);
            token = res.body.token;
            done();
        })
        .catch((err)=>{
            console.log(err);
            done();
        });
    })

    after('dropping test db', done => {
        mongoose.connection.db.dropDatabase(()=>{
            console.log('\n Test database dropped');
            done();
        });
    })

    describe('Upload image', ()=>{
        it('OK, should upload image successfully', done => {
            request(app)
            .post('/images/'+ folderId)
            .set("Authorization", "Bearer "+token)
            .field('Content-Type','multipart/form-data')
            .attach('file', './test/media/test.jpg')
            .then((res)=>{
                imageId = res.body.image._id;
                expect(res.status).to.equal(201);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: 'Image uploaded successfully'})
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });
    });

    describe('Upload audio', ()=>{
        it('OK, should upload audio successfully', done => {
            request(app)
            .post('/audios/'+ folderId)
            .set("Authorization", "Bearer "+token)
            .field('Content-Type','multipart/form-data')
            .attach('file', './test/media/test.mp3')
            .then((res)=>{
                audioId = res.body.audio._id;
                expect(res.status).to.equal(201);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: 'Audio uploaded successfully'})
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });
    });

    describe('Upload video', ()=>{
        it('OK, should upload video successfully', done => {
            request(app)
            .post('/videos/'+ folderId)
            .set("Authorization", "Bearer "+token)
            .field('Content-Type','multipart/form-data')
            .attach('file', './test/media/test.mp4')
            .then((res)=>{
                videoId = res.body.video._id;
                expect(res.status).to.equal(201);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: 'Video uploaded successfully'})
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });
    });

    describe('Add image to favourites', ()=>{
        const type = 'Image';
        it('OK, should add image to favourites', done => {
            request(app)
            .post('/favorite/add/'+ type +'/'+ imageId)
            .set("Authorization", "Bearer " + token) 
            .then((res)=>{
                expect(res.status).to.equal(200);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({ message: 'Add image to favourites'});
                expect(res.body).to.contain.property('imgfavourites');
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it('OK, should return 201 if image is already in favourite list', done => {
            request(app)
            .post('/favorite/add/'+ type +'/'+ imageId)
            .set("Authorization", "Bearer " + token) 
            .then((res)=>{
                expect(res.status).to.equal(201);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({ message: 'Already in favorites'});
                expect(res.body).to.contain.property('imgfavourites');
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it('OK, should return 404 if image is not found', done => {
            request(app)
            .post('/favorite/add/'+ type +'/'+ fakeId)
            .set("Authorization", "Bearer " + token) 
            .then((res)=>{
                expect(res.status).to.equal(404);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({ message: 'Image not found'});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it("OK, should not add image to favourites list of the user if the token doesn't exist", done => {
            request(app)
            .post('/favorite/add/'+ type +'/'+ imageId)
            .then((res)=>{
                expect(res.status).to.equal(401);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({ message: 'Auth failed' })
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it("OK, should not add image to favourites list if type doesn`t match", done => {
            request(app)
            .post('/favorite/add/'+ faketype +'/'+ imageId)
            .set("Authorization", "Bearer " + token)
            .then((res)=>{
                expect(res.status).to.equal(404);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({ message: 'Type does not match' })
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });
    });

    describe('Add audio to favourites', ()=>{
        const type = 'Audio';
        it('OK, should add audio to favourites', done => {
            request(app)
            .post('/favorite/add/'+ type +'/'+ audioId)
            .set("Authorization", "Bearer " + token) 
            .then((res)=>{
                expect(res.status).to.equal(200);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({ message: 'Add audio to favourites'});
                expect(res.body).to.contain.property('audfavourites');
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it('OK, should return 201 if audio is already in favourite list', done => {
            request(app)
            .post('/favorite/add/'+ type +'/'+ audioId)
            .set("Authorization", "Bearer " + token) 
            .then((res)=>{
                expect(res.status).to.equal(201);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({ message: 'Already in favorites'});
                expect(res.body).to.contain.property('audfavourites');
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it('OK, should return 404 if audio is not found', done => {
            request(app)
            .post('/favorite/add/'+ type +'/'+ fakeId)
            .set("Authorization", "Bearer " + token) 
            .then((res)=>{
                expect(res.status).to.equal(404);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({ message: 'Audio not found'});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it("OK, should not add audio to favourites list of the user if the token doesn't exist", done => {
            request(app)
            .post('/favorite/add/'+ type +'/'+ audioId)
            .then((res)=>{
                expect(res.status).to.equal(401);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({ message: 'Auth failed' })
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it("OK, should not add audio to favourites list if type doesn`t match", done => {
            request(app)
            .post('/favorite/add/'+ faketype +'/'+ audioId)
            .set("Authorization", "Bearer " + token)
            .then((res)=>{
                expect(res.status).to.equal(404);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({ message: 'Type does not match' })
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });
    });

    describe('Add video to favourites', ()=>{
        const type = 'Video';
        it('OK, should add video to favourites', done => {
            request(app)
            .post('/favorite/add/'+ type +'/'+ videoId)
            .set("Authorization", "Bearer " + token) 
            .then((res)=>{
                expect(res.status).to.equal(200);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({ message: 'Add video to favourites'});
                expect(res.body).to.contain.property('vidfavourites');
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it('OK, should return 201 if video is already in favourite list', done => {
            request(app)
            .post('/favorite/add/'+ type +'/'+ videoId)
            .set("Authorization", "Bearer " + token) 
            .then((res)=>{
                expect(res.status).to.equal(201);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({ message: 'Already in favorites'});
                expect(res.body).to.contain.property('vidfavourites');
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it('OK, should return 404 if video is not found', done => {
            request(app)
            .post('/favorite/add/'+ type +'/'+ fakeId)
            .set("Authorization", "Bearer " + token) 
            .then((res)=>{
                expect(res.status).to.equal(404);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({ message: 'Video not found'});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it("OK, should not add video to favourites list of the user if the token doesn't exist", done => {
            request(app)
            .post('/favorite/add/'+ type +'/'+ videoId)
            .then((res)=>{
                expect(res.status).to.equal(401);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({ message: 'Auth failed' })
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it("OK, should not add video to favourites list if type doesn`t match", done => {
            request(app)
            .post('/favorite/add/'+ faketype +'/'+ videoId)
            .set("Authorization", "Bearer " + token)
            .then((res)=>{
                expect(res.status).to.equal(404);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({ message: 'Type does not match' })
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });
    });

    describe('Remove image from favourites', ()=>{
        const type = 'Image';
        it('OK, should remove image from favourites', done => {
            request(app)
            .delete('/favorite/remove/'+ type +'/'+ imageId)
            .set("Authorization", "Bearer " + token) 
            .then((res)=>{
                expect(res.status).to.equal(200);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({ message: 'Remove image from favorites'});
                expect(res.body).to.contain.property('imgfavourites');
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it('OK, should return 201 if image is not in favourite list', done => {
            request(app)
            .delete('/favorite/remove/'+ type +'/'+ imageId)
            .set("Authorization", "Bearer " + token) 
            .then((res)=>{
                expect(res.status).to.equal(201);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({ message: 'Image not in favorites'});
                expect(res.body).to.contain.property('imgfavourites');
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it('OK, should return 404 if image is not found', done => {
            request(app)
            .delete('/favorite/remove/'+ type +'/'+ fakeId)
            .set("Authorization", "Bearer " + token) 
            .then((res)=>{
                expect(res.status).to.equal(404);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({ message: 'Image not found'});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it("OK, should not remove image from favourites list of the user if the token doesn't exist", done => {
            request(app)
            .delete('/favorite/remove/'+ type +'/'+ imageId)
            .then((res)=>{
                expect(res.status).to.equal(401);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({ message: 'Auth failed' })
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it("OK, should not remove image from favourites list if type doesn`t match", done => {
            request(app)
            .delete('/favorite/remove/'+ faketype +'/'+ imageId)
            .set("Authorization", "Bearer " + token)
            .then((res)=>{
                expect(res.status).to.equal(404);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({ message: 'Type does not match' })
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });
    });

    describe('Remove audio from favourites', ()=>{
        const type = 'Audio';
        it('OK, should remove audio from favourites', done => {
            request(app)
            .delete('/favorite/remove/'+ type +'/'+ audioId)
            .set("Authorization", "Bearer " + token) 
            .then((res)=>{
                expect(res.status).to.equal(200);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({ message: 'Remove audio from favorites'});
                expect(res.body).to.contain.property('audfavourites');
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it('OK, should return 201 if audio is not in favourite list', done => {
            request(app)
            .delete('/favorite/remove/'+ type +'/'+ audioId)
            .set("Authorization", "Bearer " + token) 
            .then((res)=>{
                expect(res.status).to.equal(201);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({ message: 'Audio not in favorites'});
                expect(res.body).to.contain.property('audfavourites');
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it('OK, should return 404 if audio is not found', done => {
            request(app)
            .delete('/favorite/remove/'+ type +'/'+ fakeId)
            .set("Authorization", "Bearer " + token) 
            .then((res)=>{
                expect(res.status).to.equal(404);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({ message: 'Audio not found'});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it("OK, should not remove audio from favourites list of the user if the token doesn't exist", done => {
            request(app)
            .delete('/favorite/remove/'+ type +'/'+ audioId)
            .then((res)=>{
                expect(res.status).to.equal(401);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({ message: 'Auth failed' })
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it("OK, should not remove audio from favourites list if type doesn`t match", done => {
            request(app)
            .delete('/favorite/remove/'+ faketype +'/'+ audioId)
            .set("Authorization", "Bearer " + token)
            .then((res)=>{
                expect(res.status).to.equal(404);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({ message: 'Type does not match' })
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });
    });

    describe('Remove video from favourites', ()=>{
        const type = 'Video';
        it('OK, should remove video from favourites', done => {
            request(app)
            .delete('/favorite/remove/'+ type +'/'+ videoId)
            .set("Authorization", "Bearer " + token) 
            .then((res)=>{
                expect(res.status).to.equal(200);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({ message: 'Remove video from favorites'});
                expect(res.body).to.contain.property('vidfavourites');
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it('OK, should return 201 if video is not in favourite list', done => {
            request(app)
            .delete('/favorite/remove/'+ type +'/'+ videoId)
            .set("Authorization", "Bearer " + token) 
            .then((res)=>{
                expect(res.status).to.equal(201);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({ message: 'Video not in favorites'});
                expect(res.body).to.contain.property('vidfavourites');
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it('OK, should return 404 if video is not found', done => {
            request(app)
            .delete('/favorite/remove/'+ type +'/'+ fakeId)
            .set("Authorization", "Bearer " + token) 
            .then((res)=>{
                expect(res.status).to.equal(404);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({ message: 'Video not found'});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it("OK, should not remove video from favourites list of the user if the token doesn't exist", done => {
            request(app)
            .delete('/favorite/remove/'+ type +'/'+ videoId)
            .then((res)=>{
                expect(res.status).to.equal(401);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({ message: 'Auth failed' })
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it("OK, should not remove video from favourites list if type doesn`t match", done => {
            request(app)
            .delete('/favorite/remove/'+ faketype +'/'+ videoId)
            .set("Authorization", "Bearer " + token)
            .then((res)=>{
                expect(res.status).to.equal(404);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({ message: 'Type does not match' })
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });
    });
    
    describe('Get favourite images', ()=>{
        const type = 'Image';
        it('OK, should get all images in favourites', done => {
            request(app)
            .get('/favorite/'+ type)
            .set("Authorization", "Bearer " + token) 
            .then((res)=>{
                expect(res.status).to.equal(200);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.contain.property('imgfavourites');
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it("OK, should not get images from favourites list of the user if the token doesn't exist", done => {
            request(app)
            .get('/favorite/'+ type)
            .then((res)=>{
                expect(res.status).to.equal(401);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({ message: 'Auth failed' })
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it("OK, should not get images from favourites list if type doesn`t match", done => {
            request(app)
            .get('/favorite/'+ faketype)
            .set("Authorization", "Bearer " + token)
            .then((res)=>{
                expect(res.status).to.equal(404);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({ message: 'Type does not match' })
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });
    });

    describe('Get favourite audios', ()=>{
        const type = 'Audio';
        it('OK, should get all audios in favourites', done => {
            request(app)
            .get('/favorite/'+ type)
            .set("Authorization", "Bearer " + token) 
            .then((res)=>{
                expect(res.status).to.equal(200);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.contain.property('audfavourites');
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it("OK, should not get audios from favourites list of the user if the token doesn't exist", done => {
            request(app)
            .get('/favorite/'+ type)
            .then((res)=>{
                expect(res.status).to.equal(401);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({ message: 'Auth failed' })
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it("OK, should not get audios from favourites list if type doesn`t match", done => {
            request(app)
            .get('/favorite/'+ faketype)
            .set("Authorization", "Bearer " + token)
            .then((res)=>{
                expect(res.status).to.equal(404);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({ message: 'Type does not match' })
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });
    });

    describe('Get favourite videos', ()=>{
        const type = 'Video';
        it('OK, should get all videos in favourites', done => {
            request(app)
            .get('/favorite/'+ type)
            .set("Authorization", "Bearer " + token) 
            .then((res)=>{
                expect(res.status).to.equal(200);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.contain.property('vidfavourites');
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it("OK, should not get videos from favourites list of the user if the token doesn't exist", done => {
            request(app)
            .get('/favorite/'+ type)
            .then((res)=>{
                expect(res.status).to.equal(401);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({ message: 'Auth failed' })
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it("OK, should not get videos from favourites list if type doesn`t match", done => {
            request(app)
            .get('/favorite/'+ faketype)
            .set("Authorization", "Bearer " + token)
            .then((res)=>{
                expect(res.status).to.equal(404);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({ message: 'Type does not match' })
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });
    });

    describe('Delete Image', ()=>{
        it('OK, should delete image successfully', done => {
            request(app)
            .delete('/images/'+ imageId)
            .set("Authorization", "Bearer "+token)
            .then((res)=>{
                expect(res.status).to.equal(200);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: 'Image deleted'})
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });
    });

    describe('\nDelete audio', ()=>{
        it('OK, should delete audio successfully', done => {
            request(app)
            .delete('/audios/'+audioId)
            .set("Authorization", "Bearer "+token)
            .then((res)=>{
                expect(res.status).to.equal(200);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: 'Audio deleted'})
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });
    });

    describe('\nDelete video', ()=>{
        it('OK, should delete video successfully', done => {
            request(app)
            .delete('/videos/'+videoId)
            .set("Authorization", "Bearer "+token)
            .then((res)=>{
                expect(res.status).to.equal(200);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: 'Video deleted'})
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });
    });
});