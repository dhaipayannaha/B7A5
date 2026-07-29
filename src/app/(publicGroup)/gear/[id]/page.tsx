import React from 'react'

export default async function GearByIdPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    return (
        <div>GearByIdPage  {id}</div>
    )
}