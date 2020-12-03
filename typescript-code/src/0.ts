/**
 * 基本数据类型声明
 * **/

const str: string = '' // 字符串
const bool: boolean = true // 布尔
const num: number = 1234 // 数字

const array: number[] = [1222, 3, 4, 45, 5] // 数字类型的数组
const array1: Array<number> = [22, 3, 4, 55, 5] // 数字类型的数组

const array2: string[] = ['22', '333', '44'] // 字符串类型数组


// const nil: null = null


// 枚举的使用
enum SexEnum {
  MAN = 1,
  WOMAN = 2
}

// 接口使用
interface IPerson {
  setName: (name: string) => void,
  setSex: (sex: SexEnum) => void,
  getName: () => string,
  getSex: () => SexEnum,
}

// 类的使用
class Person implements IPerson {

  private name: string = ''
  private sex: number = SexEnum.MAN

  constructor(name: string, sex: SexEnum) {
    this.setName(name)
    this.setSex(sex)
  }

  setName(name: string): void {
    this.name = name
  }

  setSex(sex: SexEnum): void {
    this.sex = sex
  }

  getName(): string {
    return this.name
  }

  getSex(): SexEnum {
    return this.sex
  }
}

interface ICodePerson {
  setJob: (job: string) => void
  getJob: () => string
}

// 类的继承
class CodePerson extends Person implements ICodePerson {
  private job: string = ''

  constructor(name: string, age: SexEnum) {
    super(name, age)
  }

  setJob(job: string): void {
    this.job = job
  }

  getJob(): string {
    return this.job
  }

}
