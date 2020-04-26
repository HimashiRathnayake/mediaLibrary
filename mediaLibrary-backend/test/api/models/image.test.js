const expect = require('chai').expect;
const mongoose = require('mongoose');
const faker = require('faker');

describe ('Image Modal', ()=>{
    var Image;

    beforeEach((done)=>{
        require('../../../api/models/image');
        Image = mongoose.model('Image');
        done();
    });
    
    describe ('Image Modal Save Should failes', ()=>{

        it('OK, Should not save an image without a name', (done)=>{
            var image = new Image({
                title: 'Test Title',
                subject: 'Test subject',
                artist: 'Test Artist',
                folder: mongoose.Types.ObjectId(),
                path: faker.system.filePath,
            });
            image.save()
            .catch((err)=>{
                expect(err.message).to.exist
                .and.equals('Image validation failed: imageName: Path `imageName` is required.');
                done();
            })
        })
    
        it('OK, Should not save an image without a folder', (done)=>{
            var image = new Image({
                imageName: 'Test Image',
                title: 'Test Title',
                subject: 'Test subject',
                artist: 'Test Artist',
                path: faker.system.filePath,
            });
            image.save()
            .catch((err)=>{
                expect(err.message).to.exist
                .and.equals('Image validation failed: folder: Path `folder` is required.');
                done();
            })
        })

        it('OK, Should not save an image without a path', (done)=>{
            var image = new Image({
                imageName: 'Test Image',
                title: 'Test Title',
                subject: 'Test subject',
                artist: 'Test Artist',
                folder: mongoose.Types.ObjectId(),
            });
            image.save()
            .catch((err)=>{
                expect(err.message).to.exist
                .and.equals('Image validation failed: path: Path `path` is required.');
                done();
            })
        })
    
        it('OK, Should not save an image without both path and folder', (done)=>{
            var image = new Image({
                imageName: 'Test Image',
                title: 'Test Title',
                subject: 'Test subject',
                artist: 'Test Artist',
            });
            image.save()
            .catch((err)=>{
                expect(err.message).to.exist
                .and.equals('Image validation failed: path: Path `path` is required., folder: Path `folder` is required.');
                done();
            })
        })

        it('OK, Should not save an image without both name and folder', (done)=>{
            var image = new Image({
                title: 'Test Title',
                subject: 'Test subject',
                artist: 'Test Artist',
                path: faker.system.filePath,
            });
            image.save()
            .catch((err)=>{
                expect(err.message).to.exist
                .and.equals('Image validation failed: folder: Path `folder` is required., imageName: Path `imageName` is required.');
                done();
            })
        })

        it('OK, Should not save an image without both name and path', (done)=>{
            var image = new Image({
                title: 'Test Title',
                subject: 'Test subject',
                artist: 'Test Artist',
                folder: mongoose.Types.ObjectId(),
            });
            image.save()
            .catch((err)=>{
                expect(err.message).to.exist
                .and.equals('Image validation failed: path: Path `path` is required., imageName: Path `imageName` is required.');
                done();
            })
        })

        it('OK, Should not save an image without name, folder and path', (done)=>{
            var image = new Image({
                title: 'Test Title',
                subject: 'Test subject',
                artist: 'Test Artist',
            });
            image.save()
            .catch((err)=>{
                expect(err.message).to.exist
                .and.equals('Image validation failed: path: Path `path` is required., folder: Path `folder` is required., imageName: Path `imageName` is required.');
                done();
            })
        })
    })
    
    describe('Image Model should successfully save', ()=>{

        it('OK, Should save an iamge without title as `No title`', (done)=>{
            var image = new Image({
                _id: mongoose.Types.ObjectId(),
                imageName: 'Test Image',
                subject: 'Test subject',
                artist: 'Test Artist',
                accessList: [mongoose.Types.ObjectId()],
                folder: mongoose.Types.ObjectId(),
                path: faker.system.filePath,
            });
            image.save().then((res)=>{
                expect(res).not.to.be.empty;
                expect(res).to.contain.property('_id');
                expect(res).to.be.deep.contain({imageName: "Test Image"});
                expect(res).to.be.deep.contain({subject: "Test subject"});
                expect(res).to.be.deep.contain({artist: "Test Artist"});
                expect(res).to.contain.property('accessList');
                expect(res).to.contain.property('folder');
                expect(res).to.be.deep.contain({title: "No title"});
                done();
            })
        })

        it('OK, Should save an image without subject as `No subject`', (done)=>{
            var image = new Image({
                _id: mongoose.Types.ObjectId(),
                imageName: 'Test Image',
                title: 'Test Title',
                artist: 'Test Artist',
                accessList: [mongoose.Types.ObjectId()],
                folder: mongoose.Types.ObjectId(),
                path: faker.system.filePath,
            });
            image.save().then((res)=>{
                expect(res).not.to.be.empty;
                expect(res).to.contain.property('_id');
                expect(res).to.be.deep.contain({imageName: "Test Image"});
                expect(res).to.be.deep.contain({title: "Test Title"});
                expect(res).to.be.deep.contain({artist: "Test Artist"});
                expect(res).to.contain.property('accessList');
                expect(res).to.contain.property('folder');
                expect(res).to.be.deep.contain({subject: "No subject"});
                done();
            })
        })

        it('OK, Should save an image without artist as `Unknown Artist`', (done)=>{
            var image = new Image({
                _id: mongoose.Types.ObjectId(),
                imageName: 'Test Image',
                title: 'Test Title',
                subject: 'Test Subject',
                accessList: [mongoose.Types.ObjectId()],
                folder: mongoose.Types.ObjectId(),
                path: faker.system.filePath,
            });
            image.save().then((res)=>{
                expect(res).not.to.be.empty;
                expect(res).to.contain.property('_id');
                expect(res).to.be.deep.contain({imageName: "Test Image"});
                expect(res).to.be.deep.contain({title: "Test Title"});
                expect(res).to.be.deep.contain({subject: "Test Subject"});
                expect(res).to.contain.property('accessList');
                expect(res).to.contain.property('folder');
                expect(res).to.be.deep.contain({artist: "Unknown Artist"});
                done();
            })
        })

        it('OK, Should save an image without title as `No title` and without subject as `No subject`', (done)=>{
            var image = new Image({
                _id: mongoose.Types.ObjectId(),
                imageName: 'Test Image',
                artist: 'Test Artist',
                accessList: [mongoose.Types.ObjectId()],
                folder: mongoose.Types.ObjectId(),
                path: faker.system.filePath,
            });
            image.save().then((res)=>{
                expect(res).not.to.be.empty;
                expect(res).to.contain.property('_id');
                expect(res).to.be.deep.contain({imageName: "Test Image"});
                expect(res).to.be.deep.contain({artist: "Test Artist"});
                expect(res).to.contain.property('accessList');
                expect(res).to.contain.property('folder');
                expect(res).to.be.deep.contain({title: "No title"});
                expect(res).to.be.deep.contain({subject: "No subject"});
                done();
            })
        })

        it('OK, Should save an image without title as `No title` and without artist as `Unknown Artist`', (done)=>{
            var image = new Image({
                _id: mongoose.Types.ObjectId(),
                imageName: 'Test Image',
                subject: 'Test Subject',
                accessList: [mongoose.Types.ObjectId()],
                folder: mongoose.Types.ObjectId(),
                path: faker.system.filePath,
            });
            image.save().then((res)=>{
                expect(res).not.to.be.empty;
                expect(res).to.contain.property('_id');
                expect(res).to.be.deep.contain({imageName: "Test Image"});
                expect(res).to.be.deep.contain({subject: "Test Subject"});
                expect(res).to.contain.property('accessList');
                expect(res).to.contain.property('folder');
                expect(res).to.be.deep.contain({title: "No title"});
                expect(res).to.be.deep.contain({artist: "Unknown Artist"});
                done();
            })
        })

        it('OK, Should save an image without suject as `No suject` and without artist as `Unknown Artist`', (done)=>{
            var image = new Image({
                _id: mongoose.Types.ObjectId(),
                imageName: 'Test Image',
                title: 'Test Title',
                accessList: [mongoose.Types.ObjectId()],
                folder: mongoose.Types.ObjectId(),
                path: faker.system.filePath,
            });
            image.save().then((res)=>{
                expect(res).not.to.be.empty;
                expect(res).to.contain.property('_id');
                expect(res).to.be.deep.contain({imageName: "Test Image"});
                expect(res).to.be.deep.contain({title: "Test Title"});
                expect(res).to.contain.property('accessList');
                expect(res).to.contain.property('folder');
                expect(res).to.be.deep.contain({subject: "No subject"});
                expect(res).to.be.deep.contain({artist: "Unknown Artist"});
                done();
            })
        })

        it('OK, Should save an image without title as `No title`, without subject as `No subject` and without artist as `Unknown Artist`', (done)=>{
            var image = new Image({
                _id: mongoose.Types.ObjectId(),
                imageName: 'Test Image',
                accessList: [mongoose.Types.ObjectId()],
                folder: mongoose.Types.ObjectId(),
                path: faker.system.filePath,
            });
            image.save().then((res)=>{
                expect(res).not.to.be.empty;
                expect(res).to.contain.property('_id');
                expect(res).to.be.deep.contain({imageName: "Test Image"});
                expect(res).to.contain.property('accessList');
                expect(res).to.contain.property('folder');
                expect(res).to.be.deep.contain({title: "No title"});
                expect(res).to.be.deep.contain({subject: "No subject"});
                expect(res).to.be.deep.contain({artist: "Unknown Artist"});
                done();
            })
        })

        it('OK, Should save an image correctly if all details are provided', (done)=>{
            var image = new Image({
                _id: mongoose.Types.ObjectId(),
                imageName: 'Test Image',
                title: 'Test Title',
                subject: 'Test Subject',
                artist: 'Test Artist',
                accessList: [mongoose.Types.ObjectId()],
                folder: mongoose.Types.ObjectId(),
                path: faker.system.filePath,
            });
            image.save().then((res)=>{
                expect(res).not.to.be.empty;
                expect(res).to.contain.property('_id');
                expect(res).to.be.deep.contain({imageName: "Test Image"});
                expect(res).to.be.deep.contain({title: "Test Title"});
                expect(res).to.be.deep.contain({subject: "Test Subject"});
                expect(res).to.be.deep.contain({artist: "Test Artist"});
                expect(res).to.contain.property('folder');
                expect(res).to.contain.property('accessList');
                done();
            })
        })
    })
    
})