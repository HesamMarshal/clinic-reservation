export enum BadRequestMessage {
  InValidLoginData = "اطلاعات ارسال شده برای ورود صحیح نمی باشد",
  InValidRegisterData = "اطلاعات ارسال شده برای ثبت نام صحیح نمی باشد",
  SomethingWrong = "خطایی پیش آمده",
  InvalidCategories = "دسته بندی وارد شده صحیح نمی باشد",
}
export enum AuthMessage {
  TryAgain = "دوباره تلاش کنید",
  // TODO: change to AlreadyExist
  ExpiredCode = "کد تایید منقضی شده است",
  LoginAgain = "مجدد وارد حساب کاربری خود شوید",
  LoginIsRequired = "وارد حساب کاربری خود شوید",
}
export enum UserMessage {
  Updated = "حساب کاربری به روز رسانی شد",
  ConflictPhone = "این شماره موبایل متعلق به حساب کاربری دیگری است",
}

export enum CategoryMessage {
  AlreadyExist = "این دسته بندی وجود دارد",
  NotFound = "دسته بندی پیدا نشد",
  Deleted = "دسته بندی با موفقیت حذف گردید",
  Updated = "دسته بندی با موفقیت به روز رسانی گردید",
}

export enum NotFoundMessage {}
export enum ValidationMessage {
  InvalidPhoneForamt = "فرمت شماره موبایل وارد شده قابل قبول نیست",
}
export enum PublicMessage {
  SendOtp = "کد یکبار مصرف ارسال شد",
  LoggedIn = "با موفقیت وارد حساب کاربری خود شدید",
  Created = "با موفقیت ایجاد شد",
  Updated = "به روز رسانی شد",
  Deleted = "با موفقیت حذف شد",
}