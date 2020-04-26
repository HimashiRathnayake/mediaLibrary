const expect = require('chai').expect;
const mongoose = require('mongoose');
const faker = require('faker');

describe ('Folder Modal', ()=>{
    var Folder;

    beforeEach((done)=>{
        require('../../../api/models/folder');
        Folder = mongoose.model('Folder');
        done();
    });
    
    describe ('Folder Modal Save Should failes', ()=>{

        it('OK, Should not save a folder without a folderName', (done)=>{
            var folder = new Folder({
                folderType: 'Image',
            });
            folder.save()
            .catch((err)=>{
                expect(err.message).to.exist
                .and.equals('Folder validation failed: folderName: Path `folderName` is required.');
                done();
            })
        })

        it('OK, Should not save a folder without a folderType', (done)=>{
            var folder = new Folder({
                folderName: 'Test Folder',
            });
            folder.save()
            .catch((err)=>{
                expect(err.message).to.exist
                .and.equals('Folder validation failed: folderType: Path `folderType` is required.');
                done();
            })
        })
    })

    describe('Folder Model should successfully save', ()=>{

        it('OK, Should save a folder correctly if all details are provided', (done)=>{
            var folder = new Folder({
                _id: mongoose.Types.ObjectId(),
                folderName: 'Test Folder',
                userList: [mongoose.Types.ObjectId()],
                folderType: 'Image',
            });
            folder.save().then((res)=>{
                expect(res).not.to.be.empty;
                expect(res).to.contain.property('_id');
                expect(res).to.be.deep.contain({folderName: "Test Folder"});
                expect(res).to.contain.property('userList');
                expect(res).to.be.deep.contain({folderType: "Image"});
                done();
            })
        })
    })
    
})