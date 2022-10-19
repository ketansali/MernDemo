
import { toast } from "react-toastify";
const Toast = (props) => {
  toast(props.msg, { position: toast.POSITION.TOP_RIGHT,type:props.type ,theme:'dark'});
};

export default Toast;
