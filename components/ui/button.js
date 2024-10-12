import Link from "next/link";
import classes from './button.module.css'; // Import CSS modules correctly

function Button(props) {
    if (props.link) {
        return (
            <Link href={props.link} className={classes.btn}>
                {props.children}
            </Link>
        );
    }

    return (
        <button className={classes.btn} type={props.type || 'button'} onClick={props.onClick}>
            {props.children}
        </button>
    );
}

export default Button;
