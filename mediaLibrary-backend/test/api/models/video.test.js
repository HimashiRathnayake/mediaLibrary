const expect = require('chai').expect;
const mongoose = require('mongoose');
const faker = require('faker');

describe ('Video Modal', ()=>{
    var Video;

    beforeEach((done)=>{
        require('../../../api/models/video');
        Video = mongoose.model('Video');
        done();
    });
    
    describe ('Video Modal Save Should failes', ()=>{

        it('Should not save a video without a name', (done)=>{
            var video = new Video({
                title: 'Test Title',
                artist: 'Test Artist',
                folder: mongoose.Types.ObjectId(),
                path: faker.system.filePath,
            });
            video.save()
            .catch((err)=>{
                expect(err.message).to.exist
                .and.equals('Video validation failed: videoName: Path `videoName` is required.');
                done();
            })
        })
    
        it('Should not save a video without a folder', (done)=>{
            var video = new Video({
                videoName: 'Test Audio',
                title: 'Test Title',
                artist: 'Test Artist',
                path: faker.system.filePath,
            });
            video.save()
            .catch((err)=>{
                expect(err.message).to.exist
                .and.equals('Video validation failed: folder: Path `folder` is required.');
                done();
            })
        })

        it('Should not save a video without a path', (done)=>{
            var video = new Video({
                videoName: 'Test Video',
                title: 'Test Title',
                artist: 'Test Artist',
                folder: mongoose.Types.ObjectId(),
            });
            video.save()
            .catch((err)=>{
                expect(err.message).to.exist
                .and.equals('Video validation failed: path: Path `path` is required.');
                done();
            })
        })
    
        it('Should not save a video without both path and folder', (done)=>{
            var video = new Video({
                videoName: 'Test Video',
                title: 'Test Title',
                artist: 'Test Artist',
            });
            video.save()
            .catch((err)=>{
                expect(err.message).to.exist
                .and.equals('Video validation failed: path: Path `path` is required., folder: Path `folder` is required.');
                done();
            })
        })

        it('Should not save a video without both name and folder', (done)=>{
            var video = new Video({
                title: 'Test Title',
                artist: 'Test Artist',
                path: faker.system.filePath,
            });
            video.save()
            .catch((err)=>{
                expect(err.message).to.exist
                .and.equals('Video validation failed: folder: Path `folder` is required., videoName: Path `videoName` is required.');
                done();
            })
        })

        it('Should not save a video without both name and path', (done)=>{
            var video = new Video({
                title: 'Test Title',
                artist: 'Test Artist',
                folder: mongoose.Types.ObjectId(),
            });
            video.save()
            .catch((err)=>{
                expect(err.message).to.exist
                .and.equals('Video validation failed: path: Path `path` is required., videoName: Path `videoName` is required.');
                done();
            })
        })

        it('Should not save a video without name, folder and path', (done)=>{
            var video = new Video({
                title: 'Test Title',
                artist: 'Test Artist',
            });
            video.save()
            .catch((err)=>{
                expect(err.message).to.exist
                .and.equals('Video validation failed: path: Path `path` is required., folder: Path `folder` is required., videoName: Path `videoName` is required.');
                done();
            })
        })
    })
    
    describe('Video Model should successfully save', ()=>{

        it('Should save an video without a title as `Untitled`', (done)=>{
            var video = new Video({
                _id: mongoose.Types.ObjectId(),
                videoName: 'Test Video',
                artist: 'Test Artist',
                folder: mongoose.Types.ObjectId(),
                accessList: [mongoose.Types.ObjectId()],
                path: faker.system.filePath,
            });
            video.save().then((res)=>{
                expect(res).not.to.be.empty;
                expect(res).to.contain.property('_id');
                expect(res).to.be.deep.contain({videoName: "Test Video"});
                expect(res).to.be.deep.contain({artist: "Test Artist"});
                expect(res).to.contain.property('folder');
                expect(res).to.contain.property('accessList');
                expect(res).to.be.deep.contain({title: "Untitled"});
                done();
            })
        })

        it('Should save a video without an artist as `Unknown artist`', (done)=>{
            var video = new Video({
                _id: mongoose.Types.ObjectId(),
                videoName: 'Test Video',
                title: 'Test Title',
                folder: mongoose.Types.ObjectId(),
                accessList: [mongoose.Types.ObjectId()],
                path: faker.system.filePath,
            });
            video.save().then((res)=>{
                expect(res).not.to.be.empty;
                expect(res).to.contain.property('_id');
                expect(res).to.be.deep.contain({videoName: "Test Video"});
                expect(res).to.be.deep.contain({title: "Test Title"});
                expect(res).to.contain.property('folder');
                expect(res).to.contain.property('accessList');
                expect(res).to.be.deep.contain({artist: "Unknown artist"});
                done();
            })
        })

        it('Should save a video correctly if all details are provided', (done)=>{
            var video = new Video({
                _id: mongoose.Types.ObjectId(),
                videoName: 'Test Video',
                title: 'Test Title',
                artist: 'Test Artist',
                folder: mongoose.Types.ObjectId(),
                accessList: [mongoose.Types.ObjectId()],
                path: faker.system.filePath,
            });
            video.save().then((res)=>{
                expect(res).not.to.be.empty;
                expect(res).to.contain.property('_id');
                expect(res).to.be.deep.contain({videoName: "Test Video"});
                expect(res).to.be.deep.contain({title: "Test Title"});
                expect(res).to.be.deep.contain({artist: "Test Artist"});
                expect(res).to.contain.property('folder');
                expect(res).to.contain.property('accessList');
                done();
            })
        })
    })
    
})