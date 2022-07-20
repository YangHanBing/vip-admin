//过滤时间文件
import dayjs from "dayjs"
const format = (time = "", format = "YYYY-MM-DD") => {
    return dayjs(time).format(format)
}
export default format