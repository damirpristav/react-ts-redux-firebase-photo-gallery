import { ThunkAction } from 'redux-thunk';

import { GET_ENRTY, ADD_ENTRY, DELETE_ENTRY, EntryAction, UserEntry, User } from '../types';
import { RootState } from '..';
import firebase from '../../firebase/config';

// Add/upload image 
export const addEntry = (work: any, user: User, onError: () => void): ThunkAction<void, RootState, null, EntryAction> => {

    return async dispatch => {
        debugger
        try {
            const data: UserEntry = {
                projectName: work.projectName,
                ManagerName: work.ManagerName,

                workDate: work.workDate,
                workedHours: work.workedHours,
                trackedHours: work.trackedHours,
                supportHours: work.supportHours,
  
                dailyInOutEntry: [{
                    inTime: work.inTime,
                    breakInTime: work.breakInTime,
                    breakOutTime: work.breakOutTime,
                    teaBreakInTime: work.teaBreakInTime,
                    teaBreakOutTime: work.teaBreakInTime,
                    outTime: work.outTime,
                }],

                description: work.description,

                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                userId: user.id,
                userName: user.userName,
                userEmail: user.email,
            }
            await firebase.firestore().collection('/entry').doc(user.id).set(data)

 
            await dispatch({
                type: ADD_ENTRY,
                payload: data
            });
        } catch (err) {
            onError();
            console.log(err);
        }
    }
}

// Get images
export const getEntry = (): ThunkAction<void, RootState, null, EntryAction> => {
    return async dispatch => {
        try {
            const docs = await firebase.firestore().collection('/entry').get();
            const arr: UserEntry[] = [];
            docs.forEach(doc => {
                const { projectName, ManagerName, workDate, workedHours, trackedHours, supportHours,
                    dailyInOutEntry: [{
                        inTime,
                        breakInTime,
                        breakOutTime,
                        teaBreakInTime,
                        teaBreakOutTime,
                        outTime,
                    }], description, createdAt, userId, userName, userEmail } = doc.data();
                arr.push({
                    projectName, ManagerName, workDate, workedHours, trackedHours, supportHours,
                    dailyInOutEntry: [{
                        inTime,
                        breakInTime,
                        breakOutTime,
                        teaBreakInTime,
                        teaBreakOutTime,
                        outTime,
                    }], description, createdAt, userId, userName, userEmail
                }
                );
            });
            dispatch({
                type: GET_ENRTY,
                payload: arr
            });
        } catch (err) {
            console.log(err);
        }
    }
}

// Delete entry
export const deleteEntry = (entry: any, onSuccess: () => void): ThunkAction<void, RootState, null, EntryAction> => {
    return async dispatch => {
        debugger
        try {
            // const imageRef = firebase.storage().ref().child(image.filePath);
            // await imageRef.delete();
            await firebase.firestore().collection('/entry').doc(entry.userId).delete();
            dispatch({
                type: DELETE_ENTRY,
                payload: entry
            });
            onSuccess();
        } catch (err) {
            console.log(err);
        }
    }
}