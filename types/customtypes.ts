// practiceName is ID.BE-1, e.g. -> might be better to change to something else
export interface Message {
	id?: number | undefined,
	userId?: string,
	content: string | undefined,
	question?: string,
	practiceName: string | undefined,
	timeCreated?: Date,
	byEditor?: string,
}

export interface Invitation {
	id: number,
	userId: string, // Who emitted the invitation
	target: string, // Email that the invitation was sent to
	link: string,
	token: string,
	status: string, // Accepted? Pending?
	timeCreated: Date | undefined,
	timeAccepted: Date | undefined,
	accountCreated: string | undefined, // Account created
	accountCreatedRole: string | undefined, // Role of account created
}

export interface Task {
	id: number,
	parentId: number,
	title: string,
	start: Date | null,
	end: Date | null,
	progress: number,
}

export const enum Role {
	Standard = "USER",
	Admin = "ADMIN",
	Editor = "EDITOR",
	Auditor = "AUDITOR"
}

export const enum InvitationStatus {
	Pending = "PENDING",
	Accepted = "ACCEPTED",
}

export interface Payment {
	id: number,
	userEmail: string,
	timeCreated: Date,
	timeUpdated: Date,
	amount: number,
	currency: string,
	mode: string,
	status: string,
}

export interface JwtPayload {
	name: string,
	email: string,
	iat: number,
	exp: number,
}