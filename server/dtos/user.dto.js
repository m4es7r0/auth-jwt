export class UserDto {
  id;
  email;
  fullname;
  isActivated;

  constructor(model) {
    this.id = model._id;
    this.email = model.email;
    this.fullname = model.fullname;
    this.isActivated = model.isActivated;
  }
}
