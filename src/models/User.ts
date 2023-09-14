import Schedule from "./Schedule";

export default class User {
  name: string='匿名用户';
  description: string|null=null;
  sex: string='male';
  avatar: string='/default_user_avatar.png';
  email: string='';
  phoneNumber: string='';
  location: string='';
  schedules: Schedule[]=[];

  public constructor(user:User) {
    this.name = user.name;
    this.description = user.description;
    this.sex=user.sex
    this.avatar=user.avatar
    this.email=user.email
    this.phoneNumber=user.phoneNumber
    this.location=user.location
  }

}