const expect = require('chai').expect;
const mongoose = require('mongoose');
const faker = require('faker');

describe ('Audio Modal', ()=>{
    var Audio;

    beforeEach((done)=>{
        require('../../../api/models/audio');
        Audio = mongoose.model('Audio');
        done();
    });
    
    describe ('Audio Modal Save Should failes', ()=>{

        it('OK, Should not save an audio without a name', (done)=>{
            var audio = new Audio({
                title: 'Test Title',
                album: 'Test Album',
                artist: 'Test Artist',
                year: 2019,
                folder: mongoose.Types.ObjectId(),
                path: faker.system.filePath,
            });
            audio.save()
            .catch((err)=>{
                expect(err.message).to.exist
                .and.equals('Audio validation failed: audioName: Path `audioName` is required.');
                done();
            })
        })
    
        it('OK, Should not save an audio without a folder', (done)=>{
            var audio = new Audio({
                audioName: 'Test Audio',
                title: 'Test Title',
                album: 'Test Album',
                artist: 'Test Artist',
                year: 2019,
                path: faker.system.filePath,
            });
            audio.save()
            .catch((err)=>{
                expect(err.message).to.exist
                .and.equals('Audio validation failed: folder: Path `folder` is required.');
                done();
            })
        })

        it('OK, Should not save an audio without a path', (done)=>{
            var audio = new Audio({
                audioName: 'Test Audio',
                title: 'Test Title',
                album: 'Test Album',
                artist: 'Test Artist',
                year: 2019,
                folder: mongoose.Types.ObjectId(),
            });
            audio.save()
            .catch((err)=>{
                expect(err.message).to.exist
                .and.equals('Audio validation failed: path: Path `path` is required.');
                done();
            })
        })
    
        it('OK, Should not save an audio without both path and folder', (done)=>{
            var audio = new Audio({
                audioName: 'Test Audio',
                title: 'Test Title',
                album: 'Test Album',
                artist: 'Test Artist',
                year: 2019,
            });
            audio.save()
            .catch((err)=>{
                expect(err.message).to.exist
                .and.equals('Audio validation failed: path: Path `path` is required., folder: Path `folder` is required.');
                done();
            })
        })

        it('OK, Should not save an audio without both name and folder', (done)=>{
            var audio = new Audio({
                title: 'Test Title',
                album: 'Test Album',
                artist: 'Test Artist',
                year: 2019,
                path: faker.system.filePath,
            });
            audio.save()
            .catch((err)=>{
                expect(err.message).to.exist
                .and.equals('Audio validation failed: folder: Path `folder` is required., audioName: Path `audioName` is required.');
                done();
            })
        })

        it('OK, Should not save an audio without both name and path', (done)=>{
            var audio = new Audio({
                title: 'Test Title',
                album: 'Test Album',
                artist: 'Test Artist',
                year: 2019,
                folder: mongoose.Types.ObjectId(),
            });
            audio.save()
            .catch((err)=>{
                expect(err.message).to.exist
                .and.equals('Audio validation failed: path: Path `path` is required., audioName: Path `audioName` is required.');
                done();
            })
        })

        it('OK, Should not save an audio without name, folder and path', (done)=>{
            var audio = new Audio({
                title: 'Test Title',
                album: 'Test Album',
                artist: 'Test Artist',
                year: 2019,
            });
            audio.save()
            .catch((err)=>{
                expect(err.message).to.exist
                .and.equals('Audio validation failed: path: Path `path` is required., folder: Path `folder` is required., audioName: Path `audioName` is required.');
                done();
            })
        })
    })
    
    describe('Audio Model should successfully save', ()=>{

        it('OK, Should save an audio without title as `Untitled`', (done)=>{
            var audio = new Audio({
                _id: mongoose.Types.ObjectId(),
                audioName: 'Test Audio',
                album: 'Test Album',
                artist: 'Test Artist',
                year: 2019,
                folder: mongoose.Types.ObjectId(),
                accessList: [mongoose.Types.ObjectId()],
                path: faker.system.filePath,
            });
            audio.save().then((res)=>{
                expect(res).not.to.be.empty;
                expect(res).to.contain.property('_id');
                expect(res).to.be.deep.contain({audioName: "Test Audio"});
                expect(res).to.be.deep.contain({album: "Test Album"});
                expect(res).to.be.deep.contain({artist: "Test Artist"});
                expect(res).to.be.deep.contain({year: '2019'});
                expect(res).to.contain.property('folder');
                expect(res).to.contain.property('accessList');
                expect(res).to.be.deep.contain({title: "Untitled"});
                done();
            }).catch((err)=>console.log(err))
        })

        it('OK, Should save an audio without album as `Unknown album`', (done)=>{
            var audio = new Audio({
                _id: mongoose.Types.ObjectId(),
                audioName: 'Test Audio',
                title: 'Test Title',
                artist: 'Test Artist',
                year: 2019,
                folder: mongoose.Types.ObjectId(),
                accessList: [mongoose.Types.ObjectId()],
                path: faker.system.filePath,
            });
            audio.save().then((res)=>{
                expect(res).not.to.be.empty;
                expect(res).to.contain.property('_id');
                expect(res).to.be.deep.contain({audioName: "Test Audio"});
                expect(res).to.be.deep.contain({title: "Test Title"});
                expect(res).to.be.deep.contain({artist: "Test Artist"});
                expect(res).to.be.deep.contain({year: '2019'});
                expect(res).to.contain.property('folder');
                expect(res).to.contain.property('accessList');
                expect(res).to.be.deep.contain({album: "Unknown album"});
                done();
            }).catch((err)=>console.log(err))
        })

        it('OK, Should save an audio without artist as `Unknown artist`', (done)=>{
            var audio = new Audio({
                _id: mongoose.Types.ObjectId(),
                audioName: 'Test Audio',
                title: 'Test Title',
                album: 'Test Album',
                year: 2019,
                folder: mongoose.Types.ObjectId(),
                accessList: [mongoose.Types.ObjectId()],
                path: faker.system.filePath,
            });
            audio.save().then((res)=>{
                expect(res).not.to.be.empty;
                expect(res).to.contain.property('_id');
                expect(res).to.be.deep.contain({audioName: "Test Audio"});
                expect(res).to.be.deep.contain({title: "Test Title"});
                expect(res).to.be.deep.contain({album: "Test Album"});
                expect(res).to.be.deep.contain({year: '2019'});
                expect(res).to.contain.property('folder');
                expect(res).to.contain.property('accessList');
                expect(res).to.be.deep.contain({artist: "Unknown artist"});
                done();
            }).catch((err)=>console.log(err))
        })

        it('OK, Should save an audio without title & album as `Untitled` & `Unknown album`', (done)=>{
            var audio = new Audio({
                _id: mongoose.Types.ObjectId(),
                audioName: 'Test Audio',
                artist: 'Test Artist',
                year: 2019,
                folder: mongoose.Types.ObjectId(),
                accessList: [mongoose.Types.ObjectId()],
                path: faker.system.filePath,
            });
            audio.save().then((res)=>{
                expect(res).not.to.be.empty;
                expect(res).to.contain.property('_id');
                expect(res).to.be.deep.contain({audioName: "Test Audio"});
                expect(res).to.be.deep.contain({album: "Unknown album"});
                expect(res).to.be.deep.contain({artist: "Test Artist"});
                expect(res).to.be.deep.contain({year: '2019'});
                expect(res).to.contain.property('folder');
                expect(res).to.contain.property('accessList');
                expect(res).to.be.deep.contain({title: "Untitled"});
                done();
            }).catch((err)=>console.log(err))
        })

        it('OK, Should save an audio without album & artist as `Unknown album` & `Unknown artist`', (done)=>{
            var audio = new Audio({
                _id: mongoose.Types.ObjectId(),
                audioName: 'Test Audio',
                title: 'Test Title',
                year: 2019,
                folder: mongoose.Types.ObjectId(),
                accessList: [mongoose.Types.ObjectId()],
                path: faker.system.filePath,
            });
            audio.save().then((res)=>{
                expect(res).not.to.be.empty;
                expect(res).to.contain.property('_id');
                expect(res).to.be.deep.contain({audioName: "Test Audio"});
                expect(res).to.be.deep.contain({album: "Unknown album"});
                expect(res).to.be.deep.contain({artist: "Unknown artist"});
                expect(res).to.be.deep.contain({year: '2019'});
                expect(res).to.contain.property('folder');
                expect(res).to.contain.property('accessList');
                expect(res).to.be.deep.contain({title: "Test Title"});
                done();
            }).catch((err)=>console.log(err))
        })

        it('OK, Should save an audio without title & artist as `Untitled` & `Unknown artist`', (done)=>{
            var audio = new Audio({
                _id: mongoose.Types.ObjectId(),
                audioName: 'Test Audio',
                album: 'Test Album',
                year: 2019,
                folder: mongoose.Types.ObjectId(),
                accessList: [mongoose.Types.ObjectId()],
                path: faker.system.filePath,
            });
            audio.save().then((res)=>{
                expect(res).not.to.be.empty;
                expect(res).to.contain.property('_id');
                expect(res).to.be.deep.contain({audioName: "Test Audio"});
                expect(res).to.be.deep.contain({album: "Test Album"});
                expect(res).to.be.deep.contain({artist: "Unknown artist"});
                expect(res).to.be.deep.contain({year: '2019'});
                expect(res).to.contain.property('folder');
                expect(res).to.contain.property('accessList');
                expect(res).to.be.deep.contain({title: "Untitled"});
                done();
            }).catch((err)=>console.log(err))
        })

        it('OK, Should save an audio without title, album & artist as `Untitled`, `Unknown album` & `Unknown artist`', (done)=>{
            var audio = new Audio({
                _id: mongoose.Types.ObjectId(),
                audioName: 'Test Audio',
                year: 2019,
                folder: mongoose.Types.ObjectId(),
                accessList: [mongoose.Types.ObjectId()],
                path: faker.system.filePath,
            });
            audio.save().then((res)=>{
                expect(res).not.to.be.empty;
                expect(res).to.contain.property('_id');
                expect(res).to.be.deep.contain({audioName: "Test Audio"});
                expect(res).to.be.deep.contain({album: "Unknown album"});
                expect(res).to.be.deep.contain({artist: "Unknown artist"});
                expect(res).to.be.deep.contain({year: '2019'});
                expect(res).to.contain.property('folder');
                expect(res).to.contain.property('accessList');
                expect(res).to.be.deep.contain({title: "Untitled"});
                done();
            }).catch((err)=>console.log(err))
        })

        it('OK, Should save an audio correctly if all details are provided', (done)=>{
            var audio = new Audio({
                _id: mongoose.Types.ObjectId(),
                audioName: 'Test Audio',
                title: 'Test Title',
                album: 'Test Album',
                artist: 'Test Artist',
                year: 2019,
                folder: mongoose.Types.ObjectId(),
                accessList: [mongoose.Types.ObjectId()],
                path: faker.system.filePath,
            });
            audio.save().then((res)=>{
                expect(res).not.to.be.empty;
                expect(res).to.contain.property('_id');
                expect(res).to.be.deep.contain({audioName: "Test Audio"});
                expect(res).to.be.deep.contain({title: "Test Title"});
                expect(res).to.be.deep.contain({album: "Test Album"});
                expect(res).to.be.deep.contain({artist: "Test Artist"});
                expect(res).to.be.deep.contain({year: '2019'});
                expect(res).to.contain.property('folder');
                expect(res).to.contain.property('accessList');
                done();
            }).catch((err)=>console.log(err))
        })
        
    })
    
})