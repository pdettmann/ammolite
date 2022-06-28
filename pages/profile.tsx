import Link from 'next/link'
import type { NextPage, NextPageContext } from 'next'
import Layout from '../components/Layout'

type Project = {
  projectID: string,
  apiKey: string,
  date: number,
  projectName: string,
  userID: string
}

type Props = {
  projects?: Project[];
};

export const getServerSideProps = async (ctx: NextPageContext): Promise<{ props: Props }> => {
  try {
    const res = await fetch('https://api.ammonite-profiler.xyz/GetProjects', {
      headers: {
        Cookie: ctx.req?.headers.cookie ?? ''
      }
    });
    const data = await res.json();

    return {
      props: data
    }
  } catch (err) {
    console.error(err)
    return { props: {} }
  }
}

const Profile: NextPage<Props> = (props: Props) => {
  return (
    <Layout title="Profile">
      <h1>Profile</h1>
      <p>
        <Link href="/editProfile">
          <a>Settings</a>
        </Link>
      </p>
      <h2>Projects</h2>
      <p>
        <Link href="/createProject">
          <a>Add new project</a>
        </Link>
      </p>
      <div>
        {
          props == {} ? <p> No projects yet </p> :
          <ul>
            {props.projects?.map((prop) => (
                  <li key={prop.projectID}>
                    <Link href={{pathname: `/projects/${encodeURIComponent(prop.projectID)}`}}>
                      <a>{prop.projectName}</a>
                    </Link>
                  </li>
                )
              )
            }
          </ul>
        }
      </div>
    </Layout>
  )
}

export default Profile
