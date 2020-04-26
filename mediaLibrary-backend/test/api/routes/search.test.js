process.env.NODE_ENV = 'test';
process.env.JWT_KEY = "secret";
process.env.MONGO_ATLAS_PW = "mediaLibraryPassword";
process.env.SERVER = "http://localhost:3000/";

const expect = require('chai').expect;
const request = require('supertest');
const faker = require('faker');
const mongoose = require('mongoose');

const app =require('../../../app.js');
const conn = require('../../../db.js');

let token; 
let imgartist;
let audartist;
let vidartist;
let fakeArtist = faker.random.word();
let imgtitle;
let audtitle;
let vidtitle;
let fakeTitle = faker.random.word();
let imgsubject;
let audyear;
let audalbum;
let folderId = mongoose.Types.ObjectId();
let fakecriteria = faker.random.word();
let media = ['image', 'audio', 'video'];
let fakemedia = faker.random.word();
var imgUrl ='';
var audUrl = '';
var vidUrl = '';
//let fakeUrl = 'title=bhjhvyvu';

describe ('Search routes', ()=>{
    const signup = '/user/signup';
    const preSave = {email: 'test123@gmail.com', password: faker.internet.password()};

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
                imgartist  = res.body.image.artist;
                imgtitle = res.body.image.title;
                imgsubject= res.body.image.subject;
                if(imgtitle !== 'No title'){
                    imgUrl += 'title='+ imgtitle +'&'
                }
                if(imgsubject !== 'No subject'){
                    imgUrl += 'subject='+imgsubject+'&'
                }
                if(imgartist !== 'Unknown Artist'){
                    imgUrl += 'artist='+imgartist+'&'
                }
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
                audartist  = res.body.audio.artist;
                audtitle = res.body.audio.title;
                audalbum = res.body.audio.album;
                audyear = res.body.audio.year;
                if(audtitle !== 'Untitled'){
                    audUrl += 'title='+ audtitle +'&'
                }
                if(audalbum !== 'Unknown album'){
                    audUrl += 'album='+audalbum+'&'
                }
                if(audartist !== 'Unknown Artist'){
                    audUrl += 'artist='+audartist+'&'
                }
                if(audyear !== ''){
                    audUrl += 'year='+audyear+'&'
                }
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
                vidartist  = res.body.video.artist;
                vidtitle = res.body.video.title;
                if(vidtitle !== 'Untitled'){
                    vidUrl += 'title='+ vidtitle +'&'
                }
                if(vidartist !== 'Unknown Artist'){
                    vidUrl += 'artist='+vidartist+'&'
                }
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

    describe('Search images by artist', ()=>{
        let criteria = 'artist';
        it('OK, should get all images related to the artist of the user', done => {
            request(app)
            .get('/search/'+ media[0]+ '/'+ criteria+ '/' + imgartist)
            .set("Authorization", "Bearer "+ token)
            .then((res)=>{
                expect(res.status).to.equal(200);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.contain.property('count');
                expect(res.body).to.contain.property('Images');
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it('OK, should not get images if the artist name is empty ', done => {
            request(app)
            .get('/search/'+ media[0]+ '/'+ criteria+ '/')
            .set("Authorization", "Bearer "+ token)
            .then((res)=>{
                expect(res.status).to.equal(404);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: "Route not found"});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        /* it('OK, should not get images if the artist doesn`t exist ', done => {
            request(app)
            .get('/search/'+ media[0]+ '/'+ criteria+ '/' + fakeArtist)
            .set("Authorization", "Bearer "+ token)
            .then((res)=>{
                expect(res.status).to.equal(404);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: "Artist not Found"});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        }); */

        it('OK, should not get images if the token doesn`t exist ', done => {
            request(app)
            .get('/search/'+ media[0]+ '/'+ criteria+ '/' + imgartist)
            .then((res)=>{
                expect(res.status).to.equal(401);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: "Auth failed"});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it('OK, should not get images if the criteria is invalid ', done => {
            request(app)
            .get('/search/'+ media[0]+ '/'+ fakecriteria + '/'+ imgartist)
            .set("Authorization", "Bearer "+ token)
            .then((res)=>{
                expect(res.status).to.equal(404);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: "Route not found"});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it('OK, should not get images if the media is invalid ', done => {
            request(app)
            .get('/search/'+ fakemedia+ '/'+ criteria + '/'+ imgartist)
            .set("Authorization", "Bearer "+ token)
            .then((res)=>{
                expect(res.status).to.equal(404);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: "Route not found"});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });
    })

    describe('Search audios by artist', ()=>{
        let criteria = 'artist';
        it('OK, should get all audios related to the artist of the user', done => {
            request(app)
            .get('/search/'+ media[1]+ '/'+ criteria+ '/' + audartist)
            .set("Authorization", "Bearer "+ token)
            .then((res)=>{
                expect(res.status).to.equal(200);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.contain.property('count');
                expect(res.body).to.contain.property('Audios');
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it('OK, should not get audios if the artist name is empty ', done => {
            request(app)
            .get('/search/'+ media[1]+ '/'+ criteria+ '/')
            .set("Authorization", "Bearer "+ token)
            .then((res)=>{
                expect(res.status).to.equal(404);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: "Route not found"});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        /* it('OK, should not get audios if the artist doesn`t exist ', done => {
            request(app)
            .get('/search/'+ media[1]+ '/'+ criteria+ '/' + fakeArtist)
            .set("Authorization", "Bearer "+ token)
            .then((res)=>{
                expect(res.status).to.equal(404);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: "Artist not Found"});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        }); */

        it('OK, should not get audios if the token doesn`t exist ', done => {
            request(app)
            .get('/search/'+ media[1]+ '/'+ criteria+ '/' + audartist)
            .then((res)=>{
                expect(res.status).to.equal(401);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: "Auth failed"});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it('OK, should not get audios if the criteria is invalid ', done => {
            request(app)
            .get('/search/'+ media[1]+ '/'+ fakecriteria + '/'+ audartist)
            .set("Authorization", "Bearer "+ token)
            .then((res)=>{
                expect(res.status).to.equal(404);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: "Route not found"});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it('OK, should not get audios if the media is invalid ', done => {
            request(app)
            .get('/search/'+ fakemedia+ '/'+ criteria + '/'+ audartist)
            .set("Authorization", "Bearer "+ token)
            .then((res)=>{
                expect(res.status).to.equal(404);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: "Route not found"});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });
    })

    describe('Search videos by artist', ()=>{
        let criteria = 'artist';
        it('OK, should get all videos related to the artist of the user', done => {
            request(app)
            .get('/search/'+ media[2]+ '/'+ criteria+ '/' + vidartist)
            .set("Authorization", "Bearer "+ token)
            .then((res)=>{
                expect(res.status).to.equal(200);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.contain.property('count');
                expect(res.body).to.contain.property('Videos');
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it('OK, should not get videos if the artist name is empty ', done => {
            request(app)
            .get('/search/'+ media[2]+ '/'+ criteria+ '/')
            .set("Authorization", "Bearer "+ token)
            .then((res)=>{
                expect(res.status).to.equal(404);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: "Route not found"});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        /* it('OK, should not get videos if the artist doesn`t exist ', done => {
            request(app)
            .get('/search/'+ media[2]+ '/'+ criteria+ '/' + fakeArtist)
            .set("Authorization", "Bearer "+ token)
            .then((res)=>{
                expect(res.status).to.equal(404);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: "Artist not Found"});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        }); */

        it('OK, should not get videos if the token doesn`t exist ', done => {
            request(app)
            .get('/search/'+ media[2]+ '/'+ criteria+ '/' + vidartist)
            .then((res)=>{
                expect(res.status).to.equal(401);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: "Auth failed"});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it('OK, should not get videos if the criteria is invalid ', done => {
            request(app)
            .get('/search/'+ media[2]+ '/'+ fakecriteria + '/'+ vidartist)
            .set("Authorization", "Bearer "+ token)
            .then((res)=>{
                expect(res.status).to.equal(404);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: "Route not found"});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it('OK, should not get videos if the media is invalid ', done => {
            request(app)
            .get('/search/'+ fakemedia+ '/'+ criteria + '/'+ vidartist)
            .set("Authorization", "Bearer "+ token)
            .then((res)=>{
                expect(res.status).to.equal(404);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: "Route not found"});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });
    })

    describe('Search images by title', ()=>{
        let criteria = 'title';
        it('OK, should get all images related to the title of the user', done => {
            request(app)
            .get('/search/'+ media[0]+ '/'+ criteria+ '/' + imgtitle)
            .set("Authorization", "Bearer "+ token)
            .then((res)=>{
                expect(res.status).to.equal(200);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.contain.property('count');
                expect(res.body).to.contain.property('Images');
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it('OK, should not get images if the title is empty ', done => {
            request(app)
            .get('/search/'+ media[0]+ '/'+ criteria+ '/')
            .set("Authorization", "Bearer "+ token)
            .then((res)=>{
                expect(res.status).to.equal(404);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: "Route not found"});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        /* it('OK, should not get images if the title doesn`t exist ', done => {
            request(app)
            .get('/search/'+ media[0]+ '/'+ criteria+ '/' + fakeTitle)
            .set("Authorization", "Bearer "+ token)
            .then((res)=>{
                expect(res.status).to.equal(404);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: "Title not Found"});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        }); */

        it('OK, should not get images if the token doesn`t exist ', done => {
            request(app)
            .get('/search/'+ media[0]+ '/'+ criteria+ '/' + imgtitle)
            .then((res)=>{
                expect(res.status).to.equal(401);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: "Auth failed"});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it('OK, should not get images if the criteria is invalid ', done => {
            request(app)
            .get('/search/'+ media[0]+ '/'+ fakecriteria + '/'+ imgtitle)
            .set("Authorization", "Bearer "+ token)
            .then((res)=>{
                expect(res.status).to.equal(404);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: "Route not found"});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it('OK, should not get images if the media is invalid ', done => {
            request(app)
            .get('/search/'+ fakemedia+ '/'+ criteria + '/'+ imgtitle)
            .set("Authorization", "Bearer "+ token)
            .then((res)=>{
                expect(res.status).to.equal(404);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: "Route not found"});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });
    })

    describe('Search audios by title', ()=>{
        let criteria = 'title';
        it('OK, should get all audios related to the title of the user', done => {
            request(app)
            .get('/search/'+ media[1]+ '/'+ criteria+ '/' + audtitle)
            .set("Authorization", "Bearer "+ token)
            .then((res)=>{
                expect(res.status).to.equal(200);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.contain.property('count');
                expect(res.body).to.contain.property('Audios');
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it('OK, should not get audios if the title is empty ', done => {
            request(app)
            .get('/search/'+ media[1]+ '/'+ criteria+ '/')
            .set("Authorization", "Bearer "+ token)
            .then((res)=>{
                expect(res.status).to.equal(404);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: "Route not found"});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        /* it('OK, should not get audios if the title doesn`t exist ', done => {
            request(app)
            .get('/search/'+ media[1]+ '/'+ criteria+ '/' + fakeTitle)
            .set("Authorization", "Bearer "+ token)
            .then((res)=>{
                expect(res.status).to.equal(404);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: "Title not Found"});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        }); */

        it('OK, should not get audios if the token doesn`t exist ', done => {
            request(app)
            .get('/search/'+ media[1]+ '/'+ criteria+ '/' + audtitle)
            .then((res)=>{
                expect(res.status).to.equal(401);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: "Auth failed"});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it('OK, should not get audios if the criteria is invalid ', done => {
            request(app)
            .get('/search/'+ media[1]+ '/'+ fakecriteria + '/'+ audtitle)
            .set("Authorization", "Bearer "+ token)
            .then((res)=>{
                expect(res.status).to.equal(404);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: "Route not found"});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it('OK, should not get audios if the media is invalid ', done => {
            request(app)
            .get('/search/'+ fakemedia+ '/'+ criteria + '/'+ audtitle)
            .set("Authorization", "Bearer "+ token)
            .then((res)=>{
                expect(res.status).to.equal(404);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: "Route not found"});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });
    })

    describe('Search videos by title', ()=>{
        let criteria = 'title';
        it('OK, should get all videos related to the title of the user', done => {
            request(app)
            .get('/search/'+ media[2]+ '/'+ criteria+ '/' + vidtitle)
            .set("Authorization", "Bearer "+ token)
            .then((res)=>{
                expect(res.status).to.equal(200);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.contain.property('count');
                expect(res.body).to.contain.property('Videos');
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it('OK, should not get videos if the title is empty ', done => {
            request(app)
            .get('/search/'+ media[2]+ '/'+ criteria+ '/')
            .set("Authorization", "Bearer "+ token)
            .then((res)=>{
                expect(res.status).to.equal(404);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: "Route not found"});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        /* it('OK, should not get videos if the title doesn`t exist ', done => {
            request(app)
            .get('/search/'+ media[2]+ '/'+ criteria+ '/' + fakeTitle)
            .set("Authorization", "Bearer "+ token)
            .then((res)=>{
                expect(res.status).to.equal(404);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: "Title not Found"});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        }); */

        it('OK, should not get videos if the token doesn`t exist ', done => {
            request(app)
            .get('/search/'+ media[2]+ '/'+ criteria+ '/' + vidtitle)
            .then((res)=>{
                expect(res.status).to.equal(401);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: "Auth failed"});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it('OK, should not get videos if the criteria is invalid ', done => {
            request(app)
            .get('/search/'+ media[2]+ '/'+ fakecriteria + '/'+ vidtitle)
            .set("Authorization", "Bearer "+ token)
            .then((res)=>{
                expect(res.status).to.equal(404);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: "Route not found"});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it('OK, should not get videos if the media is invalid ', done => {
            request(app)
            .get('/search/'+ fakemedia+ '/'+ criteria + '/'+ vidtitle)
            .set("Authorization", "Bearer "+ token)
            .then((res)=>{
                expect(res.status).to.equal(404);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: "Route not found"});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });
    })

    describe('Search images', ()=>{
        it('OK, should get all images related to the url', done => {
            request(app)
            .get('/search/'+ media[0]+ '/?'+ imgUrl.substring(0, imgUrl.length-1))
            .set("Authorization", "Bearer "+ token)
            .then((res)=>{
                expect(res.status).to.equal(200);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.contain.property('count');
                expect(res.body).to.contain.property('Images');
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it('OK, should not get images if doesn`t pass any value', done => {
            request(app)
            .get('/search/'+ media[0]+ '/?')
            .set("Authorization", "Bearer "+ token)
            .then((res)=>{
                expect(res.status).to.equal(409);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: "Didn`t pass any value"});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        /* it('OK, should not get images if values not found', done => {
            request(app)
            .get('/search/'+ media[0]+ '/?' + fakeUrl )
            .set("Authorization", "Bearer "+ token)
            .then((res)=>{
                expect(res.status).to.equal(404);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: "URL not Found"});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        }); */

        it('OK, should not get images if token doesn`t exist ', done => {
            request(app)
            .get('/search/'+ media[0]+ '/?' + imgUrl.substring(0, imgUrl.length-1) )
            .then((res)=>{
                expect(res.status).to.equal(401);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: "Auth failed"});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it('OK, should not get images if route is invalid', done => {
            request(app)
            .get('/search/'+ media[0] + imgUrl.substring(0, imgUrl.length-1) )
            .then((res)=>{
                expect(res.status).to.equal(404);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: "Route not found"});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it('OK, should not get images if media name is invalid', done => {
            request(app)
            .get('/search/'+ fakemedia+ '/?' + imgUrl.substring(0, imgUrl.length-1) )
            .then((res)=>{
                expect(res.status).to.equal(404);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: "Route not found"});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });
    })
    
    describe('Search audios', ()=>{
        it('OK, should get all audios related to the url', done => {
            request(app)
            .get('/search/'+ media[1]+ '/?'+ audUrl.substring(0, audUrl.length-1))
            .set("Authorization", "Bearer "+ token)
            .then((res)=>{
                expect(res.status).to.equal(200);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.contain.property('count');
                expect(res.body).to.contain.property('Audios');
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it('OK, should not get audios if doesn`t pass any value', done => {
            request(app)
            .get('/search/'+ media[1]+ '/?')
            .set("Authorization", "Bearer "+ token)
            .then((res)=>{
                expect(res.status).to.equal(409);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: "Didn`t pass any value"});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        /* it('OK, should not get audios if values not found', done => {
            request(app)
            .get('/search/'+ media[1]+ '/?' + fakeUrl )
            .set("Authorization", "Bearer "+ token)
            .then((res)=>{
                expect(res.status).to.equal(404);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: "URL not Found"});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        }); */

        it('OK, should not get audios if token doesn`t exist ', done => {
            request(app)
            .get('/search/'+ media[1]+ '/?' + audUrl.substring(0, audUrl.length-1) )
            .then((res)=>{
                expect(res.status).to.equal(401);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: "Auth failed"});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it('OK, should not get audios if route is invalid', done => {
            request(app)
            .get('/search/'+ media[1] + audUrl.substring(0, audUrl.length-1) )
            .then((res)=>{
                expect(res.status).to.equal(404);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: "Route not found"});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it('OK, should not get audios if media name is invalid', done => {
            request(app)
            .get('/search/'+ fakemedia+ '/?' + audUrl.substring(0, audUrl.length-1) )
            .then((res)=>{
                expect(res.status).to.equal(404);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: "Route not found"});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });
    })

    describe('Search Videos', ()=>{
        it('OK, should get all videos related to the url', done => {
            request(app)
            .get('/search/'+ media[2]+ '/?'+ vidUrl.substring(0, vidUrl.length-1))
            .set("Authorization", "Bearer "+ token)
            .then((res)=>{
                expect(res.status).to.equal(200);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.contain.property('count');
                expect(res.body).to.contain.property('Videos');
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it('OK, should not get videos if doesn`t pass any value', done => {
            request(app)
            .get('/search/'+ media[2]+ '/?')
            .set("Authorization", "Bearer "+ token)
            .then((res)=>{
                expect(res.status).to.equal(409);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: "Didn`t pass any value"});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        /* it('OK, should not get videos if values not found', done => {
            request(app)
            .get('/search/'+ media[2]+ '/?' + fakeUrl )
            .set("Authorization", "Bearer "+ token)
            .then((res)=>{
                expect(res.status).to.equal(404);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: "URL not Found"});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        }); */

        it('OK, should not get videos if token doesn`t exist ', done => {
            request(app)
            .get('/search/'+ media[2]+ '/?' + vidUrl.substring(0, vidUrl.length-1) )
            .then((res)=>{
                expect(res.status).to.equal(401);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: "Auth failed"});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it('OK, should not get videos if route is invalid', done => {
            request(app)
            .get('/search/'+ media[2] + vidUrl.substring(0, vidUrl.length-1) )
            .then((res)=>{
                expect(res.status).to.equal(404);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: "Route not found"});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it('OK, should not get videos if media name is invalid', done => {
            request(app)
            .get('/search/'+ fakemedia+ '/?' + vidUrl.substring(0, vidUrl.length-1) )
            .then((res)=>{
                expect(res.status).to.equal(404);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: "Route not found"});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });
    })

    

})
