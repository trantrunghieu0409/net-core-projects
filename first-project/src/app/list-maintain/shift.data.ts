import { MaintainanceShift } from "./shift.template"
export const SHIFTS: MaintainanceShift[] = [
  {
    ID: 1,
    Code: "HCMV202-19012022-DK-01",
    POPType: "HCMV202",
    POP: "MPOP",
    Staff: [
      "tester.ktv",
      "tester.ktv1",
      "tester.adminntcap"
    ],
    MaintainDate: Date.parse("2022-01-19"),
    RealDate: Date.parse("2022-01-19"),
    MaintainType: 'Định kỳ',
    Status: "Quá hạn",
    Control: "Chưa xác nhận",
    NOTOK: 0
  },
  {
    ID: 2,
    Code: "HCMV202-19012022-DK-02",
    POPType: "HCMV202",
    POP: "MPOP",
    Staff: [
      "tester.ktv",
      "tester.ktv1",
      "tester.adminntcap"
    ],
    MaintainDate: Date.parse("2022-01-19"),
    RealDate: Date.parse("2022-05-19"),
    MaintainType: 'Định kỳ',
    Status: "Đã hoàn tất",
    Control: "Đã xác nhận lại 2",
    NOTOK: 4
  }
]
