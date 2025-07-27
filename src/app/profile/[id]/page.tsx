export default function ProfilePage({params}:any) {
    return (
        <div className="p-4 flex flex-col items-center justify-center ">
            <h1>Profile Page 
            <span className="p-2 bg-orange-500 text-black">{params.id}</span></h1>
            <br/>
            <p>This is your profile page. Here you can view and edit your profile information.</p>
            <p>Currently, this page is under construction.</p>
        </div>
    )
}