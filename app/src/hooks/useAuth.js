import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, updateUser, setToken, setLoading } from '../store/authReducer';
import { addAppliedJob } from "../store/userReducer";

const useAuth = () => {
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });
  const { token } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const getJobs = async () => {
    const res = await api.get('jobs', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    console.log(res.data);
    return res.data;
  }

  const runCode = async (code, language) => {
    const res = await api.post('/interview/compile', {
      code: {
        text: code,
      }, language
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    console.log(res.data);
    return res.data;
  }
  const getAllInvites = async () => {
    const res = await api.get('get-all-invites', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    console.log(res.data);
    return res.data;
  }

  const getApplicants = async (jobId) => {
    const res = await api.post(`getApplicants`, { jobId }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    console.log(res.data);
    return res.data;
  }

  const getDistinctRoles = async () => {
    const res = await api.get('/get-distinct-roles', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    return res.data;
  }

  const createJobs = async (job) => {
    const res = await api.post('create-job', job, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    console.log(res.data);
    return res.data;
  }

  const sendInvite = async (userEmail, jobId) => {
    const res = await api.post('invite-applicant', { jobId, userEmail }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    console.log(res.data);
    return res.data;
  }

  const getProfile = async (email) => {
    const res = await api.post('get-applicant-profile', { email }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    console.log(res.data);
    return res.data;
  }

  const applyJob = async (jobId, message) => {
    console.log(jobId, message)
    const res = await api.post('apply-job', { jobId, msg: message }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    dispatch(addAppliedJob(jobId))
    console.log(res);
  }

  const signup = async (userData) => {
    const res = await api.post(
      `auth/${userData.role}/register`,
      userData
    );
    console.log(res);
    return res.data;
  };

  const login = async (userData) => {
    return api
      .post(`auth/${userData.role}/login`, userData)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          dispatch(loginUser(res.data))
          localStorage.setItem('token', res.data.token);
          return true;
        }
      })
      .catch((err) => {
        dispatch(setToken(null));
        console.log(err);
        return false;
      });
  };

  const updateProfile = async (profileData) => {
    const res = await api.post(
      `update-profile`,
      profileData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    console.log(res);
    return res.data;
  }

  const getUser = async () => {
    return api
      .get("profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        dispatch(setLoading(false))
        if (res.status === 200) {
          dispatch(updateUser({ ...res.data }))
        }
        return true;
      })
      .catch((err) => {
        console.log(err);
        dispatch(setLoading(false));
        return false;
      });
  };

  // useEffect(() => {
  //   let id;
  //   if (token) {
  //     dispatch(setLoading(true));
  //     // setLoading(true);
  //     id = setTimeout(() => {
  //       getUser();
  //     }, 1000);
  //   } else {
  //     dispatch(setLoading(false));
  //     // setLoading(false);
  //     // setUser(null);
  //   }

  //   return () => clearTimeout(id);
  // }, [token]);

  const logout = () => {
    dispatch(updateUser(null));
    dispatch(setToken(null));
    localStorage.removeItem('token');
  };

  return { login, logout, signup, getUser, getJobs, getDistinctRoles, applyJob, createJobs, getApplicants, updateProfile, sendInvite, getProfile, runCode, getAllInvites };
};

export default useAuth;
