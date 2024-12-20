"""empty message

Revision ID: a042f317ca03
Revises: c9443b807f3b
Create Date: 2024-11-23 08:31:51.287211

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'a042f317ca03'
down_revision: Union[str, None] = 'c9443b807f3b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('host_scans',
    sa.Column('domain', sa.String(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.Column('ips', sa.ARRAY(sa.String()), nullable=False),
    sa.Column('ports', sa.ARRAY(sa.Integer()), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('asset_id', sa.Integer(), nullable=True),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['asset_id'], ['assets.id'], ondelete='SET NULL'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('host_scans')
    # ### end Alembic commands ###
