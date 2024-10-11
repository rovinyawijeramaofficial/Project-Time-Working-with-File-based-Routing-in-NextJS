import Link from "next/link";
import classes from './button.module.css'; // Import CSS modules correctly

function Button(props) {
    return (
        <Link href={props.link} className={classes.btn}>
            {props.children}
        </Link>
    );
}

export default Button;
