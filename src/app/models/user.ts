export class User {
  constructor(
    public uid: string = '',
    public name: string = '',
    public email: string = '',
    public password: string = '',
    public displayName: string = '',
    public about: string = '',
    public imageUrl: string = '',
    public emailVerified: boolean = false
  ) {}
}
