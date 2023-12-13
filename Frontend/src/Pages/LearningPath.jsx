import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

export default function LearningPath() {
    const { ideaid } = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .post(`http://localhost:8000/generate_learning_path`, {
                userid: localStorage.getItem("ideagen_user_id"),
                ideaid: ideaid,
            })
            .then(
                (response) => {
                    console.log(response.data);
                },
                (error) => {
                    console.log(error);
                }
            );
    }, [ideaid]);

}