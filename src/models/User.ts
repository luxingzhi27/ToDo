import Schedule from "./Schedule";
import store from "@/store";

export default class User {
  name: string='匿名用户';
  description: string|null=null;
  sex: string='male';
  avatar: string='/public/default_user_avatar.png';
  schedules: Schedule[]=[];

  public constructor(user:User) {
    this.name = user.name;
    this.description = user.description;
    this.sex=user.sex
    this.avatar=user.avatar
  }

}