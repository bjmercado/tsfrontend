import {observable, action, decorate} from 'mobx';

import UserApi from '../api/UserApi';

export interface IUsers{
    id: number;
    user_nickname: string;
    user_email: string;
    user_password: string;
    role: number;
}

export interface IUserStore{
    email: string;
    password: string;
    isAuthenticated: boolean;
    login(): Promise<boolean>;
    getUsers(): Promise<IUsers[]>;
    users: IUsers[];
    emailContainer: string;
    passwordContainer: string;
    nickNameContainer: string;
    addUsers(): Promise<void>;
    viewUser(id: number): Promise<any>;
    updateUsers(id: number): void;
    deleteUsers(id: number): Promise<void>;
}

export class UserStore implements IUserStore{
    public email: string = '';
    public password: string = '';
    public isAuthenticated: boolean = false;
    public users: IUsers[] = [];
    public emailContainer: string = '';
    public passwordContainer: string = '';
    public nickNameContainer: string = '';


    public async login(): Promise<boolean> {
        let data = {
            email: this.email,
            password: this.password
        }
        const result = await UserApi.post('/login', data);
        return result.data.responseData;
    }

    public async getUsers(): Promise<IUsers[]>{
        const result = await UserApi.get('/getusers');
        return result.data.responseData;
    }

    public async addUsers(): Promise<any>{
        let data = {
            user_email: this.emailContainer,
            user_password: this.passwordContainer,
            user_nickname: this.nickNameContainer
        }

       const result = await UserApi.post('/storeusers', data);
       const {responseData} = result.data;
       if(responseData.length > 0){
            this.users.push(responseData[0]);
       }
    }

    public async viewUser(id: number): Promise<any>{
        const result = await UserApi.post(`/viewusers/${id}`);
        return result.data.responseData[0];
    }

    public updateUsers(id: number): void{
        const data = {
            user_nickname: this.nickNameContainer,
            user_email: this.emailContainer
        }
        UserApi.put(`/updateusers/${id}`, data);
    }

    public async deleteUsers(id: number): Promise<void>{
        const result = await UserApi.delete(`/deleteusers/${id}`);
        const {responseData} = result.data;
        if(responseData.affectedRows > 0){
            this.users = this.users.filter(user => user.id !== id)
        }      
    }
    
}

decorate(UserStore, {
    email: observable,
    password: observable,
    isAuthenticated: observable,
    login: action,
    getUsers: action,
    users: observable,
    emailContainer: observable,
    passwordContainer: observable,
    nickNameContainer: observable,
    addUsers: action,
    viewUser: action,
    updateUsers: action,
    deleteUsers: action
});